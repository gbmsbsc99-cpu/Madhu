import { SyncQueue, SyncConflict } from '../types/index';

export class SyncService {
  private syncQueue: SyncQueue[] = [];
  private isSyncing = false;
  private syncInterval: NodeJS.Timeout | null = null;
  private onlineFlagListeners: Set<(isOnline: boolean) => void> = new Set();

  constructor(
    private apiBaseUrl: string,
    private storageService: any // StorageService instance
  ) {
    this.initializeNetworkListeners();
  }

  private initializeNetworkListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
    }
  }

  private handleOnline(): void {
    console.log('✅ Network available, starting sync...');
    this.notifyOnlineStatusChange(true);
    this.performSync();
    this.startPeriodicSync();
  }

  private handleOffline(): void {
    console.log('⚠️ Network unavailable, operating in offline mode');
    this.notifyOnlineStatusChange(false);
    this.stopPeriodicSync();
  }

  private notifyOnlineStatusChange(isOnline: boolean): void {
    this.onlineFlagListeners.forEach(listener => listener(isOnline));
  }

  onOnlineStatusChange(callback: (isOnline: boolean) => void): void {
    this.onlineFlagListeners.add(callback);
  }

  async queueOperation(
    entityType: string,
    entityId: string,
    action: 'create' | 'update' | 'delete',
    payload: any
  ): Promise<void> {
    const queueItem: SyncQueue = {
      id: this.generateId(),
      entityType,
      entityId,
      action,
      payload,
      timestamp: new Date().toISOString(),
      synced: false,
      retries: 0,
    };

    this.syncQueue.push(queueItem);
    await this.storageService.setItem(`queue_${queueItem.id}`, queueItem);

    // Try immediate sync if online
    if (navigator.onLine) {
      await this.performSync();
    }
  }

  private async performSync(): Promise<void> {
    if (this.isSyncing || this.syncQueue.length === 0) return;

    this.isSyncing = true;

    try {
      for (const item of this.syncQueue) {
        if (item.synced) continue;
        if (item.retries >= 3) {
          console.error(`Failed to sync item after 3 retries: ${item.id}`);
          continue;
        }

        try {
          const response = await this.sendToServer(item);
          item.synced = true;
          item.syncedAt = new Date().toISOString();
          await this.storageService.setItem(`queue_${item.id}`, item);
          console.log(`✅ Synced: ${item.entityType}/${item.entityId}`);
        } catch (error) {
          item.retries++;
          console.warn(`Retry ${item.retries}/3 for ${item.id}:`, error);
        }
      }

      // Remove synced items from memory queue
      this.syncQueue = this.syncQueue.filter(item => !item.synced);
    } finally {
      this.isSyncing = false;
    }
  }

  private async sendToServer(queueItem: SyncQueue): Promise<any> {
    const endpoint = `${this.apiBaseUrl}/sync/${queueItem.entityType}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await this.getAuthToken()}`,
      },
      body: JSON.stringify(queueItem),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    return response.json();
  }

  private async getAuthToken(): Promise<string> {
    const token = await this.storageService.getItem('authToken');
    return token || '';
  }

  private startPeriodicSync(): void {
    if (this.syncInterval) return;
    this.syncInterval = setInterval(() => this.performSync(), 30000); // Every 30s
  }

  private stopPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  async getSyncStatus(): Promise<{
    pending: number;
    synced: number;
    failed: number;
    isOnline: boolean;
  }> {
    const pending = this.syncQueue.filter(item => !item.synced && item.retries < 3).length;
    const synced = this.syncQueue.filter(item => item.synced).length;
    const failed = this.syncQueue.filter(item => item.retries >= 3).length;

    return {
      pending,
      synced,
      failed,
      isOnline: navigator.onLine,
    };
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

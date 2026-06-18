// Unified storage service for offline-first functionality

export interface IStorageAdapter {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}

// IndexedDB Adapter for Web
export class IndexedDBAdapter implements IStorageAdapter {
  private dbName = 'HealthSystem';
  private version = 1;
  private db: IDBDatabase | null = null;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('store')) {
          db.createObjectStore('store');
        }
      };
    });
  }

  async set(key: string, value: any): Promise<void> {
    if (!this.db) await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['store'], 'readwrite');
      const store = transaction.objectStore('store');
      const request = store.put(value, key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get(key: string): Promise<any> {
    if (!this.db) await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['store'], 'readonly');
      const store = transaction.objectStore('store');
      const request = store.get(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async remove(key: string): Promise<void> {
    if (!this.db) await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['store'], 'readwrite');
      const store = transaction.objectStore('store');
      const request = store.delete(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(): Promise<void> {
    if (!this.db) await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['store'], 'readwrite');
      const store = transaction.objectStore('store');
      const request = store.clear();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async keys(): Promise<string[]> {
    if (!this.db) await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['store'], 'readonly');
      const store = transaction.objectStore('store');
      const request = store.getAllKeys();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result as string[]);
    });
  }
}

// Memory Adapter for fallback
export class MemoryAdapter implements IStorageAdapter {
  private store = new Map<string, any>();

  async set(key: string, value: any): Promise<void> {
    this.store.set(key, value);
  }

  async get(key: string): Promise<any> {
    return this.store.get(key);
  }

  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async keys(): Promise<string[]> {
    return Array.from(this.store.keys());
  }
}

// Main Storage Service
export class StorageService {
  private adapter: IStorageAdapter;

  constructor(adapter: IStorageAdapter) {
    this.adapter = adapter;
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    return this.adapter.set(key, JSON.stringify(value));
  }

  async getItem<T>(key: string): Promise<T | null> {
    const value = await this.adapter.get(key);
    return value ? JSON.parse(value) : null;
  }

  async removeItem(key: string): Promise<void> {
    return this.adapter.remove(key);
  }

  async clear(): Promise<void> {
    return this.adapter.clear();
  }

  async getAllKeys(): Promise<string[]> {
    return this.adapter.keys();
  }
}

# Offline-First Sync Guide

## Overview

The healthcare system is designed to work seamlessly offline. All data is synced when network becomes available.

## How Offline Mode Works

### 1. Automatic Detection

```typescript
// Automatically detects network status
window.addEventListener('online', () => {
  // Network available - sync begins
});

window.addEventListener('offline', () => {
  // Offline mode - queue operations locally
});
```

### 2. Local Storage

**Web**: IndexedDB
- Up to 50MB per domain
- Structured database
- Query support

**Mobile**: AsyncStorage
- Up to 100MB
- Key-value store
- Persistent

### 3. Sync Queue

Pending changes are queued:
```typescript
interface SyncQueue {
  id: string;                    // Unique queue item ID
  entityType: string;            // 'patient', 'admission', etc.
  entityId: string;              // ID of entity being changed
  action: 'create' | 'update' | 'delete';
  payload: any;                  // The data being synced
  timestamp: string;             // When it was queued
  synced: boolean;               // Has it been synced?
  syncedAt?: string;             // When it was synced
  retries: number;               // Sync attempt count
}
```

### 4. Sync Process

```
[Network Available]
         │
         ▼
[Load queue from storage]
         │
         ▼
[For each pending item]
         │
         ├─► [Send to server]
         │       │
         │   ┌───┴────┬────────┐
         │   │        │        │
         │ Success  Conflict  Error
         │   │        │        │
         │   │        │    [Retry]
         │   │        │     max 3x
         │   │        │        │
         │   └────────┴────────┘
         │           │
         ▼ [Update local]
    [Mark as synced]
         │
         ▼
[Remove from queue]
```

## Handling Conflicts

### Scenario 1: Server Version is Newer

```
Local change: patient.phone = "555-1234"
Server version: patient.phone = "555-5678"

Resolution: Server version wins (newer timestamp)
Local version is overwritten
```

### Scenario 2: Concurrent Updates

```
Both local and server modified same field

Resolution options:
1. Server version (default)
2. Local version
3. Manual merge
```

### Scenario 3: Delete Conflict

```
Local: Deleted patient record
Server: Record was updated

Resolution: Server update applied (delete ignored)
```

## Manual Sync Trigger

```typescript
// Force sync immediately
await syncService.performSync();

// Get sync status
const status = await syncService.getSyncStatus();
console.log(`Pending: ${status.pending}, Failed: ${status.failed}`);
```

## User Indicators

### Offline Indicator
```
📡 You are offline. Working in offline mode.
```

### Sync Status
```
🔄 Syncing 5 pending changes...
```

### Per-Item Status
```
Patient Record A: ✅ Synced
Patient Record B: 🔄 Pending
Patient Record C: ⚠️ Failed (will retry)
```

## Best Practices

### For Developers

1. **Always handle sync failures gracefully**
   ```typescript
   try {
     await syncService.queueOperation(...);
   } catch (error) {
     showErrorMessage('Changes will sync when online');
   }
   ```

2. **Show clear feedback to users**
   - Pending indicator
   - Success confirmation
   - Retry buttons

3. **Test offline scenarios**
   - DevTools network throttling
   - Turn off WiFi/mobile
   - Simulate failures

### For Users

1. **Check online status before critical operations**
   - Look for offline indicator
   - Check sync status

2. **Don't close app during sync**
   - Wait for sync indicator to disappear
   - Data will persist even if closed

3. **Review changes when reconnecting**
   - Verify synced data
   - Check for conflicts

## Troubleshooting

### Sync Queue Growing

**Problem**: Pending items not clearing

**Solution**:
1. Check network connection
2. Verify server is running
3. Check browser console for errors
4. Clear app cache and retry

### Data Appearing Twice

**Problem**: Same data synced multiple times

**Solution**:
1. Manual sync might have retried
2. Check sync queue for duplicates
3. Refresh to reload from server

### Conflicts Not Resolving

**Problem**: Conflict notification keeps appearing

**Solution**:
1. Review conflict details
2. Choose resolution (server/local/manual)
3. If manual, verify data integrity
4. Submit resolution

## Advanced: Implementing Custom Sync Logic

```typescript
class CustomSyncService extends SyncService {
  async sendToServer(queueItem: SyncQueue): Promise<any> {
    // Custom implementation
    // Can add compression, batching, prioritization
    return super.sendToServer(queueItem);
  }
  
  async handleConflict(local: any, server: any): Promise<'local' | 'server' | 'merge'> {
    // Custom conflict resolution
    // Can implement business logic
    return 'server';
  }
}
```

## Monitoring Sync Health

**Metrics to track**:
- Sync success rate
- Average sync time
- Retry count
- Conflict frequency
- Queue size over time

**Alerts to set up**:
- Sync queue > 100 items
- Sync failure rate > 5%
- Sync time > 30 seconds

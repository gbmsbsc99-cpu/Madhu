import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';
import './SyncStatus.css';

const SyncStatus: React.FC = () => {
  const { syncService } = useContext(AppContext);
  const [syncStatus, setSyncStatus] = React.useState<any>(null);

  useEffect(() => {
    const checkStatus = async () => {
      if (syncService) {
        const status = await syncService.getSyncStatus();
        setSyncStatus(status);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [syncService]);

  if (!syncStatus || syncStatus.pending === 0) return null;

  return (
    <div className="sync-status">
      <span className="sync-icon">🔄</span>
      <span>Syncing {syncStatus.pending} pending changes...</span>
    </div>
  );
};

export default SyncStatus;

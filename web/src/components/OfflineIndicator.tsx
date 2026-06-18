import React from 'react';
import './OfflineIndicator.css';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="offline-indicator">
      <span className="offline-icon">📡</span>
      <span>You are offline. Working in offline mode.</span>
    </div>
  );
};

export default OfflineIndicator;

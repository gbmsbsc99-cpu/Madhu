import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { SyncService } from '../shared/services/SyncService';
import { StorageService, IndexedDBAdapter } from '../shared/services/StorageService';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientListPage from './pages/PatientListPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import AdmissionPage from './pages/AdmissionPage';
import VitalSignsPage from './pages/VitalSignsPage';
import LabTestPage from './pages/LabTestPage';
import BedManagementPage from './pages/BedManagementPage';
import AppointmentPage from './pages/AppointmentPage';
import BillingPage from './pages/BillingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

// Components
import Layout from './components/Layout';
import OfflineIndicator from './components/OfflineIndicator';
import SyncStatus from './components/SyncStatus';

// Styles
import './App.css';

interface AppContextType {
  isOnline: boolean;
  syncService: SyncService | null;
  storageService: StorageService | null;
}

export const AppContext = React.createContext<AppContextType>({
  isOnline: navigator.onLine,
  syncService: null,
  storageService: null,
});

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncService, setSyncService] = useState<SyncService | null>(null);
  const [storageService, setStorageService] = useState<StorageService | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        // Initialize storage
        const adapter = new IndexedDBAdapter();
        const storage = new StorageService(adapter);
        setStorageService(storage);

        // Initialize sync service
        const sync = new SyncService(
          process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
          storage
        );
        setSyncService(sync);

        // Check authentication
        const token = await storage.getItem('authToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Failed to initialize services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeServices();
  }, []);

  // Network listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen to sync service online status
  useEffect(() => {
    if (syncService) {
      syncService.onOnlineStatusChange((online) => setIsOnline(online));
    }
  }, [syncService]);

  const handleLogout = useCallback(async () => {
    if (storageService) {
      await storageService.removeItem('authToken');
      await storageService.removeItem('user');
    }
    setIsAuthenticated(false);
  }, [storageService]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Initializing Healthcare System...</p>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ isOnline, syncService, storageService }}>
        <Router>
          <div className="app">
            <OfflineIndicator isOnline={isOnline} />
            <SyncStatus />

            {isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/patients" element={<PatientListPage />} />
                  <Route path="/patients/:id" element={<PatientDetailsPage />} />
                  <Route path="/admissions" element={<AdmissionPage />} />
                  <Route path="/vital-signs" element={<VitalSignsPage />} />
                  <Route path="/lab-tests" element={<LabTestPage />} />
                  <Route path="/beds" element={<BedManagementPage />} />
                  <Route path="/appointments" element={<AppointmentPage />} />
                  <Route path="/billing" element={<BillingPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            ) : (
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            )}
          </div>
        </Router>
      </AppContext.Provider>
    </Provider>
  );
};

export default App;

import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SyncService } from '../shared/services/SyncService';
import { StorageService } from '../shared/services/StorageService';

// Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PatientListScreen from './screens/PatientListScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';
import VitalSignsScreen from './screens/VitalSignsScreen';
import LabTestsScreen from './screens/LabTestsScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import SettingsScreen from './screens/SettingsScreen';

import store from './store';
import OfflineIndicator from './components/OfflineIndicator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppContext = React.createContext<any>(null);

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [syncService, setSyncService] = useState<SyncService | null>(null);
  const [storageService, setStorageService] = useState<StorageService | null>(null);

  // Initialize services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        // Create storage adapter for React Native
        const adapter = {
          set: async (key: string, value: any) => {
            await AsyncStorage.setItem(key, JSON.stringify(value));
          },
          get: async (key: string) => {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
          },
          remove: async (key: string) => {
            await AsyncStorage.removeItem(key);
          },
          clear: async () => {
            await AsyncStorage.clear();
          },
          keys: async () => {
            return await AsyncStorage.getAllKeys();
          },
        };

        const storage = new StorageService(adapter);
        setStorageService(storage);

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

  if (isLoading) {
    return null; // Show splash screen
  }

  const DashboardStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#667eea' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Hospital Dashboard' }}
      />
    </Stack.Navigator>
  );

  const PatientStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#667eea' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="PatientList"
        component={PatientListScreen}
        options={{ title: 'Patients' }}
      />
      <Stack.Screen
        name="PatientDetails"
        component={PatientDetailsScreen}
        options={{ title: 'Patient Details' }}
      />
    </Stack.Navigator>
  );

  const VitalsStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#667eea' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="VitalSigns"
        component={VitalSignsScreen}
        options={{ title: 'Vital Signs' }}
      />
    </Stack.Navigator>
  );

  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ isOnline, syncService, storageService }}>
        <NavigationContainer>
          <OfflineIndicator isOnline={isOnline} />
          {isAuthenticated ? (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: '#fff',
                  borderTopColor: '#e0e0e0',
                  paddingBottom: 5,
                },
                tabBarLabelStyle: { fontSize: 11, marginBottom: 5 },
              }}
            >
              <Tab.Screen
                name="DashboardStack"
                component={DashboardStack}
                options={{
                  title: '📊 Dashboard',
                  tabBarLabel: 'Dashboard',
                }}
              />
              <Tab.Screen
                name="PatientStack"
                component={PatientStack}
                options={{
                  title: '👥 Patients',
                  tabBarLabel: 'Patients',
                }}
              />
              <Tab.Screen
                name="VitalsStack"
                component={VitalsStack}
                options={{
                  title: '❤️ Vitals',
                  tabBarLabel: 'Vitals',
                }}
              />
              <Tab.Screen
                name="LabTests"
                component={LabTestsScreen}
                options={{
                  title: '🧪 Lab Tests',
                  tabBarLabel: 'Lab Tests',
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  title: '⚙️ Settings',
                  tabBarLabel: 'Settings',
                }}
              />
            </Tab.Navigator>
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </AppContext.Provider>
    </Provider>
  );
};

export default App;

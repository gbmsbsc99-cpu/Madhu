import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { AppContext } from '../App';

const SettingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isOnline, syncService } = useContext(AppContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.statusItem}>
          <Text style={styles.label}>Network</Text>
          <View
            style={[styles.statusBadge, isOnline ? styles.online : styles.offline]}
          >
            <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 15,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  online: {
    backgroundColor: '#d4edda',
  },
  offline: {
    backgroundColor: '#f8d7da',
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
  },
  appVersion: {
    fontSize: 13,
    color: '#999',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

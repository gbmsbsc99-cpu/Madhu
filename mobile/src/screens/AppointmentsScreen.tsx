import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <Text style={styles.subtitle}>Schedule and manage appointments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default AppointmentsScreen;

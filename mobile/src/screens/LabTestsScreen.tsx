import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LabTestsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab Tests</Text>
      <Text style={styles.subtitle}>Manage and view laboratory test results</Text>
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

export default LabTestsScreen;

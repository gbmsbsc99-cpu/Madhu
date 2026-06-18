import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PatientDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Details</Text>
      <Text>Patient ID: {route.params?.patientId}</Text>
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
    marginBottom: 15,
  },
});

export default PatientDetailsScreen;

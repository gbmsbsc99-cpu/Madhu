import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const VitalSignsScreen: React.FC = () => {
  const vitals = [
    { label: 'Heart Rate', value: '78', unit: 'bpm', status: 'normal' },
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal' },
    { label: 'Temperature', value: '37.5', unit: '°C', status: 'normal' },
    { label: 'Oxygen Saturation', value: '98', unit: '%', status: 'normal' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vital Signs Monitoring</Text>
      {vitals.map((vital, index) => (
        <View key={index} style={styles.vitalCard}>
          <Text style={styles.vitalLabel}>{vital.label}</Text>
          <View style={styles.vitalValue}>
            <Text style={styles.value}>{vital.value}</Text>
            <Text style={styles.unit}>{vital.unit}</Text>
          </View>
          <View style={[styles.statusIndicator, styles[`status_${vital.status}`]]} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  vitalCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vitalLabel: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  vitalValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginHorizontal: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  unit: {
    fontSize: 11,
    color: '#999',
    marginLeft: 3,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  status_normal: {
    backgroundColor: '#28a745',
  },
  status_warning: {
    backgroundColor: '#ffc107',
  },
  status_critical: {
    backgroundColor: '#dc3545',
  },
});

export default VitalSignsScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const PatientListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients] = useState([
    { id: '1', mrn: 'MR001', firstName: 'John', lastName: 'Doe', age: 45, status: 'Admitted' },
    { id: '2', mrn: 'MR002', firstName: 'Jane', lastName: 'Smith', age: 32, status: 'Outpatient' },
    { id: '3', mrn: 'MR003', firstName: 'Robert', lastName: 'Johnson', age: 58, status: 'Admitted' },
  ]);

  const filteredPatients = patients.filter(
    (p) =>
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Admitted':
        return '#cfe2ff';
      case 'Outpatient':
        return '#d4edda';
      default:
        return '#e2e3e5';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or MRN..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#999"
      />

      {filteredPatients.map((patient) => (
        <TouchableOpacity
          key={patient.id}
          style={styles.patientCard}
          onPress={() => navigation.navigate('PatientDetails', { patientId: patient.id })}
        >
          <View style={styles.patientHeader}>
            <View>
              <Text style={styles.patientName}>
                {patient.firstName} {patient.lastName}
              </Text>
              <Text style={styles.patientMRN}>{patient.mrn}</Text>
            </View>
            <View
              style={[styles.statusBadge, { backgroundColor: getStatusColor(patient.status) }]}
            >
              <Text style={styles.statusText}>{patient.status}</Text>
            </View>
          </View>
          <View style={styles.patientDetails}>
            <Text style={styles.detailText}>Age: {patient.age} years</Text>
          </View>
        </TouchableOpacity>
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
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 14,
  },
  patientCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  patientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  patientMRN: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
  },
  patientDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
});

export default PatientListScreen;

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hospital Dashboard</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>45</Text>
          <Text style={styles.statLabel}>Admitted</Text>
          <Text style={styles.statChange}>+2 this week</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>155</Text>
          <Text style={styles.statLabel}>Available Beds</Text>
          <Text style={styles.statChange}>77% occupancy</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>23</Text>
          <Text style={styles.statLabel}>Pending Tests</Text>
          <Text style={styles.statChange}>8 critical</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>18</Text>
          <Text style={styles.statLabel}>Appointments</Text>
          <Text style={styles.statChange}>12 completed</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Admissions</Text>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.itemTitle}>John Doe</Text>
            <Text style={styles.itemSubtitle}>Bed A-101 • Admitted 2 days ago</Text>
          </View>
          <View style={[styles.badge, styles.badgeStable]}>
            <Text style={styles.badgeText}>Stable</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Critical Alerts</Text>
        <View style={[styles.alertBox, styles.alertWarning]}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Patient A-105: High Heart Rate</Text>
            <Text style={styles.alertMessage}>HR: 120 bpm - Review immediately</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statChange: {
    fontSize: 11,
    color: '#999',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  badgeStable: {
    backgroundColor: '#d4edda',
  },
  badgeText: {
    fontSize: 11,
    color: '#155724',
    fontWeight: 'bold',
  },
  alertBox: {
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
  },
  alertWarning: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  alertMessage: {
    fontSize: 12,
    color: '#666',
  },
});

export default DashboardScreen;

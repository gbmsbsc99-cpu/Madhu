import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>📡 Offline Mode - Data will sync when online</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff3cd',
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#856404',
    fontWeight: 'bold',
  },
});

export default OfflineIndicator;

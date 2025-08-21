import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import type { HomeStackScreenProps } from '@/types/navigation';

export function HomeDetailScreen({ route }: HomeStackScreenProps<'HomeDetail'>) {
  const { homeId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Detail</Text>
      <Text style={styles.subtitle}>Home ID: {homeId}</Text>
      <Text style={styles.note}>
        This screen will show home details, rooms, and allow navigation to room management.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  note: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
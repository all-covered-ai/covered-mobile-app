import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';
import { apiService } from '@/services/apiService';
import type { HomeStackScreenProps } from '@/types/navigation';
import type { Home } from '@/types/database';

export function HomesListScreen({ navigation }: HomeStackScreenProps<'HomesList'>) {
  const { homes, setHomes } = useStore();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHomes();
  }, []);

  const loadHomes = async () => {
    setLoading(true);
    try {
      const result = await apiService.getHomes();
      
      if (result.success && result.homes) {
        setHomes(result.homes);
      } else {
        Alert.alert('Error', result.error || 'Failed to load homes');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load homes');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHomes();
    setRefreshing(false);
  };

  const renderHome = ({ item }: { item: Home }) => (
    <TouchableOpacity 
      style={styles.homeCard}
      onPress={() => navigation.navigate('HomeDetail', { homeId: item.id })}
    >
      <View style={styles.homeInfo}>
        <Text style={styles.homeName}>{item.name}</Text>
        <Text style={styles.homeAddress}>{item.address}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {homes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="home-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Homes Added</Text>
          <Text style={styles.emptySubtitle}>
            Add your first home to start managing your inventory
          </Text>
        </View>
      ) : (
        <FlatList
          data={homes}
          renderItem={renderHome}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CreateHome')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
  },
  homeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  homeInfo: {
    flex: 1,
  },
  homeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  homeAddress: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D5569A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useStore } from '@/store/useStore';
import { apiService } from '@/services/apiService';
import type { HomeStackScreenProps } from '@/types/navigation';

export function CreateHomeScreen({ navigation }: HomeStackScreenProps<'CreateHome'>) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { addHome } = useStore();

  const handleCreate = async () => {
    if (!name.trim() || !address.trim()) {
      Alert.alert('Error', 'Please enter both home name and address');
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.createHome({
        name: name.trim(),
        address: address.trim(),
      });

      if (result.success && result.home) {
        addHome(result.home);
        navigation.goBack();
      } else {
        Alert.alert('Error', result.error || 'Failed to create home');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Home Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., My House, Beach House"
          value={name}
          onChangeText={setName}
          editable={!loading}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter the full address"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Create Home'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  form: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
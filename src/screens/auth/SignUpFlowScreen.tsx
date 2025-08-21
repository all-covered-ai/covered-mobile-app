import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { CoveredLogo } from '@/components/CoveredLogo';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUpFlow'>;

export const SignUpFlowScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const handleContinue = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setShowEmailConfirmation(true);
  };

  const handleConfirmEmail = () => {
    setShowEmailConfirmation(false);
    navigation.navigate('CreatePassword', { email: email.trim().toLowerCase() });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.header}>
          <CoveredLogo size={80} />
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Join Covered to protect your stuff!</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="go"
              onSubmitEditing={handleContinue}
              editable={!loading}
            />
          </View>

          <TouchableOpacity 
            style={[styles.continueButton, !email.trim() && styles.buttonDisabled]} 
            onPress={handleContinue}
            disabled={!email.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.privacyText}>By continuing you agree to our Privacy Policy</Text>
        </View>
      </View>

      <Modal
        visible={showEmailConfirmation}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEmailConfirmation(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.emailConfirmModalContent}>
            <Text style={styles.emailConfirmTitle}>Confirm your email address</Text>
            <Text style={styles.emailConfirmDescription}>
              Please verify your email address is correct. You'll need this to sign in later.
            </Text>

            <View style={styles.emailDisplayContainer}>
              <Text style={styles.emailDisplayLabel}>Email Address</Text>
              <Text style={styles.emailDisplayValue}>{email.trim().toLowerCase()}</Text>
            </View>

            <View style={styles.emailConfirmButtons}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => setShowEmailConfirmation(false)}
              >
                <Text style={styles.backButtonText}>Back to Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmEmailButton}
                onPress={handleConfirmEmail}
              >
                <Text style={styles.confirmEmailButtonText}>Confirm Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  continueButton: {
    backgroundColor: '#D5569A',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: '#E6A8C4',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  privacyText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  emailConfirmModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingBottom: 40,
  },
  emailConfirmTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emailConfirmDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  emailDisplayContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  emailDisplayLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  emailDisplayValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D5569A',
  },
  emailConfirmButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  confirmEmailButton: {
    flex: 1,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#D5569A',
  },
  confirmEmailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
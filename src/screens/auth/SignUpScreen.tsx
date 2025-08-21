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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { CoveredLogo } from '@/components/CoveredLogo';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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

    navigation.navigate('PasswordScreen', { email: email.trim().toLowerCase() });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <CoveredLogo size={80} />
          <Text style={styles.title}>Log in to Covered</Text>
          <Text style={styles.subtitle}>Welcome back! Log in to continue.</Text>
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

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.appleButton}>
            <Ionicons name="logo-apple" size={20} color="#fff" />
            <Text style={styles.appleButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.signUpLink}
            onPress={() => navigation.navigate('SignUpFlow')}
          >
            <Text style={styles.signUpLinkText}>
              Don't have an account? <Text style={styles.signUpLinkBold}>Sign up</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.privacyText}>By continuing you agree to our Privacy Policy</Text>
        </View>
      </View>
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
    paddingTop: 60,
  },
  header: {
    marginBottom: 60,
    alignItems: 'center',
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
  appleButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  appleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
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
  signUpLink: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpLinkText: {
    fontSize: 14,
    color: '#666',
  },
  signUpLinkBold: {
    color: '#D5569A',
    fontWeight: '600',
  },
  privacyText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
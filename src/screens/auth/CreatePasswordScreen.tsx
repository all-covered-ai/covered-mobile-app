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

type Props = NativeStackScreenProps<AuthStackParamList, 'CreatePassword'>;

export const CreatePasswordScreen = ({ navigation, route }: Props) => {
  const { email } = route.params;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const validatePassword = (pwd: string) => {
    return {
      minLength: pwd.length >= 8,
      hasUpperLower: /(?=.*[a-z])(?=.*[A-Z])/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    };
  };

  const validation = validatePassword(password);
  const isPasswordValid = Object.values(validation).every(Boolean);

  const handleNext = () => {
    if (!isPasswordValid) {
      Alert.alert('Error', 'Please ensure your password meets all requirements');
      return;
    }
    setShowTerms(true);
  };

  const handleTermsAccept = () => {
    if (!ageConfirmed || !termsAccepted) {
      Alert.alert('Error', 'Please accept the terms and confirm your age');
      return;
    }
    
    setShowTerms(false);
    navigation.navigate('CollectName', { 
      email,
      password
    });
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
          <Text style={styles.title}>Create your password for</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="new-password"
                returnKeyType="next"
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.validation}>
            <ValidationItem 
              isValid={validation.minLength} 
              text="Minimum 8 characters" 
            />
            <ValidationItem 
              isValid={validation.hasUpperLower} 
              text="One uppercase & lowercase letter" 
            />
            <ValidationItem 
              isValid={validation.hasNumber} 
              text="One number" 
            />
            <ValidationItem 
              isValid={validation.hasSpecial} 
              text="One special character" 
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, !isPasswordValid && styles.buttonDisabled]} 
            onPress={handleNext}
            disabled={!isPasswordValid || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Create account</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showTerms}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTerms(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.termsModalContent}>
            <Text style={styles.termsTitle}>Accept terms</Text>
            <Text style={styles.termsDescription}>
              Please read and accept our terms and conditions before you continue.
            </Text>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkbox}
                onPress={() => setAgeConfirmed(!ageConfirmed)}
              >
                {ageConfirmed && (
                  <Ionicons name="checkmark" size={16} color="#D5569A" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                I am a U.S. Resident, 18 years or older.
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkbox}
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                {termsAccepted && (
                  <Ionicons name="checkmark" size={16} color="#D5569A" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                By accepting, I agree to the Covered{' '}
                <Text style={styles.link}>Program Agreement</Text>,{' '}
                <Text style={styles.link}>Privacy Policy</Text>, and{' '}
                <Text style={styles.link}>Auto Debit Authorization</Text>.
              </Text>
            </View>

            <View style={styles.termsButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowTerms(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.acceptButton, 
                  (!ageConfirmed || !termsAccepted) && styles.buttonDisabled
                ]}
                onPress={handleTermsAccept}
                disabled={!ageConfirmed || !termsAccepted}
              >
                <Text style={styles.acceptButtonText}>I accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
  <View style={styles.validationItem}>
    <Ionicons 
      name={isValid ? "checkmark-circle" : "ellipse-outline"} 
      size={16} 
      color={isValid ? "#D5569A" : "#ccc"} 
    />
    <Text style={[styles.validationText, isValid && styles.validationTextValid]}>
      {text}
    </Text>
  </View>
);

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
    marginBottom: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 28,
    fontWeight: '700',
    color: '#D5569A',
    letterSpacing: -0.3,
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
  passwordContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  validation: {
    marginBottom: 32,
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  validationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  validationTextValid: {
    color: '#D5569A',
  },
  button: {
    backgroundColor: '#D5569A',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E6A8C4',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  termsModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingBottom: 40,
  },
  termsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  termsDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  link: {
    color: '#D5569A',
    textDecorationLine: 'underline',
  },
  termsButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  acceptButton: {
    flex: 1,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#D5569A',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
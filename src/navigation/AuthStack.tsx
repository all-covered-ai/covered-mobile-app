import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { SignUpScreen } from '@/screens/auth/SignUpScreen';
import { PasswordScreen } from '@/screens/auth/PasswordScreen';
import { SignUpFlowScreen } from '@/screens/auth/SignUpFlowScreen';
import { CreatePasswordScreen } from '@/screens/auth/CreatePasswordScreen';
import { CollectNameScreen } from '@/screens/auth/CollectNameScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen';

// Types
import type { AuthStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
      <Stack.Screen name="SignUpFlow" component={SignUpFlowScreen} />
      <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
      <Stack.Screen name="CollectName" component={CollectNameScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
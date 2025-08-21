import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

// Config
import { supabase } from '@/config/supabase';
import { useStore } from '@/store/useStore';
import { authService } from '@/services/authService';

// Navigation
import { AuthStack } from '@/navigation/AuthStack';
import { MainNavigator } from '@/navigation/MainNavigator';

// Types
import type { RootStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const { user, setUser, setLoading, isLoading, isAuthenticated } = useStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        // Sync with backend when user signs in
        if (session?.user && event === 'SIGNED_IN') {
          await authService.syncUserWithBackend();
        }
        
        setLoading(false);
      }
    );

    // Handle deep linking for email confirmation
    const handleDeepLink = (url: string) => {
      const { queryParams } = Linking.parse(url);
      
      if (queryParams?.access_token && queryParams?.refresh_token) {
        // Auto-login with tokens from email confirmation
        supabase.auth.setSession({
          access_token: queryParams.access_token as string,
          refresh_token: queryParams.refresh_token as string,
        });
      }
    };

    // Listen for incoming links
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Check if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      subscription.unsubscribe();
      linkingSubscription?.remove();
    };
  }, []);

  if (isLoading) {
    // TODO: Add proper loading screen
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="Main" component={MainNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
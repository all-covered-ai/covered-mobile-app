import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { HomesListScreen } from '@/screens/homes/HomesListScreen';
import { HomeDetailScreen } from '@/screens/homes/HomeDetailScreen';
import { CreateHomeScreen } from '@/screens/homes/CreateHomeScreen';

// Types
import type { HomeStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="HomesList" 
        component={HomesListScreen}
        options={{ title: 'My Homes' }}
      />
      <Stack.Screen 
        name="HomeDetail" 
        component={HomeDetailScreen}
        options={{ title: 'Home Details' }}
      />
      <Stack.Screen 
        name="CreateHome" 
        component={CreateHomeScreen}
        options={{ title: 'Add New Home' }}
      />
      {/* TODO: Add remaining screens */}
    </Stack.Navigator>
  );
}
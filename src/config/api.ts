import Constants from 'expo-constants';

export const API_CONFIG = {
  baseURL: Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 10000,
};

export const ENDPOINTS = {
  auth: {
    verify: '/api/auth/verify',
    profile: '/api/auth/profile',
  },
  homes: '/api/homes',
  rooms: '/api/rooms',
  items: '/api/items',
  images: '/api/images',
  notifications: {
    pushToken: '/api/notifications/push-token',
    send: '/api/notifications/send',
  },
} as const;
# Covered Mobile App - Clean React Native Implementation

## Overview
Fresh, clean React Native mobile app for the Covered home inventory system using modern Expo and Supabase architecture.

## Tech Stack
- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Navigation**: React Navigation v7
- **UI**: React Native Elements / Native Base
- **Camera**: Expo ImagePicker
- **Notifications**: Expo Notifications

## Features
- 🔐 **Supabase Authentication** - JWT-based auth with social providers
- 🏠 **Home Management** - Create and manage properties
- 🏢 **Room Management** - Organize rooms by type
- 📦 **Item Inventory** - Track valuable items with photos
- 📸 **Camera Integration** - Photo capture and management
- 🔔 **Push Notifications** - Real-time updates
- 📱 **Offline Support** - Local storage with sync
- 🎨 **Modern UI** - Clean, intuitive design

## App Structure
```
src/
├── components/         # Reusable UI components
├── screens/           # App screens
├── navigation/        # Navigation configuration
├── services/          # API and external services
├── store/            # State management
├── types/            # TypeScript definitions
├── utils/            # Helper functions
└── config/           # App configuration
```

## API Integration
Connects to the clean Supabase backend at `http://localhost:3000` with endpoints for:
- Authentication (verify, profile)
- Homes CRUD
- Rooms CRUD  
- Items CRUD
- Push notifications

## Development
```bash
npm install
npm start
```

## Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_API_URL=http://localhost:3000
```
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  SignUp: undefined;
  PasswordScreen: { email: string };
  SignUpFlow: undefined;
  CreatePassword: { email: string };
  CollectName: { email: string; password: string };
  Login: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Homes: undefined;
  Profile: undefined;
};

// Home Stack
export type HomeStackParamList = {
  HomesList: undefined;
  HomeDetail: { homeId: string };
  CreateHome: undefined;
  EditHome: { homeId: string };
  RoomsList: { homeId: string };
  RoomDetail: { roomId: string };
  CreateRoom: { homeId: string };
  EditRoom: { roomId: string };
  ItemsList: { roomId: string };
  ItemDetail: { itemId: string };
  CreateItem: { roomId: string };
  EditItem: { itemId: string };
  Camera: { roomId?: string; itemId?: string };
};

// Root Stack
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// Screen Props Types
export type AuthScreenProps<T extends keyof AuthStackParamList> = StackScreenProps<AuthStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  StackScreenProps<RootStackParamList>
>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = StackScreenProps<HomeStackParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
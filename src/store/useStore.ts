import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User, Home, Room, Item } from '@/types/database';

interface AppState {
  // Auth
  user: SupabaseUser | null;
  profile: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Data
  homes: Home[];
  currentHome: Home | null;
  rooms: Room[];
  items: Item[];

  // Actions
  setUser: (user: SupabaseUser | null) => void;
  setProfile: (profile: User | null) => void;
  setLoading: (loading: boolean) => void;
  setHomes: (homes: Home[]) => void;
  setCurrentHome: (home: Home | null) => void;
  addHome: (home: Home) => void;
  updateHome: (home: Home) => void;
  removeHome: (homeId: string) => void;
  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  clearData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      profile: null,
      isAuthenticated: false,
      isLoading: true,
      homes: [],
      currentHome: null,
      rooms: [],
      items: [],

      // Auth actions
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        ...(user === null && { profile: null })
      }),
      
      setProfile: (profile) => set({ profile }),
      
      setLoading: (isLoading) => set({ isLoading }),

      // Home actions
      setHomes: (homes) => set({ homes }),
      
      setCurrentHome: (currentHome) => set({ currentHome }),
      
      addHome: (home) => set((state) => ({ 
        homes: [...state.homes, home] 
      })),
      
      updateHome: (updatedHome) => set((state) => ({
        homes: state.homes.map(home => 
          home.id === updatedHome.id ? updatedHome : home
        ),
        currentHome: state.currentHome?.id === updatedHome.id ? updatedHome : state.currentHome
      })),
      
      removeHome: (homeId) => set((state) => ({
        homes: state.homes.filter(home => home.id !== homeId),
        currentHome: state.currentHome?.id === homeId ? null : state.currentHome,
        rooms: state.currentHome?.id === homeId ? [] : state.rooms,
        items: state.currentHome?.id === homeId ? [] : state.items
      })),

      // Room actions
      setRooms: (rooms) => set({ rooms }),
      
      addRoom: (room) => set((state) => ({ 
        rooms: [...state.rooms, room] 
      })),
      
      updateRoom: (updatedRoom) => set((state) => ({
        rooms: state.rooms.map(room => 
          room.id === updatedRoom.id ? updatedRoom : room
        )
      })),
      
      removeRoom: (roomId) => set((state) => ({
        rooms: state.rooms.filter(room => room.id !== roomId),
        items: state.items.filter(item => item.room_id !== roomId)
      })),

      // Item actions
      setItems: (items) => set({ items }),
      
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
      
      updateItem: (updatedItem) => set((state) => ({
        items: state.items.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        )
      })),
      
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter(item => item.id !== itemId)
      })),

      // Clear all data
      clearData: () => set({
        homes: [],
        currentHome: null,
        rooms: [],
        items: []
      }),
    }),
    {
      name: 'covered-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist certain fields
        currentHome: state.currentHome,
        homes: state.homes,
      }),
    }
  )
);
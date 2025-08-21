import { supabase } from '@/config/supabase';
import { apiService } from './apiService';
import { useStore } from '@/store/useStore';

class AuthService {
  async signUp(email: string, password: string, name: string = '') {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            display_name: name.trim(),
            email_verified: true,
          },
        },
      });

      if (error) {
        throw error;
      }

      // After successful account creation, sync with backend
      if (data.user) {
        await this.syncUserWithBackend();
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign up failed'
      };
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw error;
      }

      // After successful login, sync with backend
      if (data.user) {
        await this.syncUserWithBackend();
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign in failed'
      };
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      // Clear local data
      useStore.getState().clearData();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign out failed'
      };
    }
  }

  async syncUserWithBackend() {
    try {
      // Verify auth with backend and create/sync user
      const verifyResult = await apiService.verifyAuth();
      
      if (verifyResult.success) {
        // Get full profile data
        const profileResult = await apiService.getProfile();
        
        if (profileResult.success && profileResult.data) {
          const { setProfile } = useStore.getState();
          setProfile((profileResult.data as any).user);
        }
      }

      return verifyResult;
    } catch (error) {
      console.error('Failed to sync user with backend:', error);
      return {
        success: false,
        error: 'Failed to sync with backend'
      };
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get user'
      };
    }
  }

  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to refresh session'
      };
    }
  }
}

export const authService = new AuthService();
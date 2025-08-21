import { supabase } from '@/config/supabase';
import { API_CONFIG, ENDPOINTS } from '@/config/api';
import type { Home, Room, Item } from '@/types/database';

class ApiService {
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No authentication token available');
    }

    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      const headers = await this.getAuthHeaders();
      const url = `${API_CONFIG.baseURL}${endpoint}`;
      console.log('🌐 API Request:', options.method || 'GET', url);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      console.log('📥 API Response:', response.status, data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('💥 API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Auth endpoints
  async verifyAuth() {
    return this.request(ENDPOINTS.auth.verify, {
      method: 'POST',
    });
  }

  async getProfile() {
    return this.request(ENDPOINTS.auth.profile);
  }

  // Homes endpoints
  async getHomes(): Promise<{ success: boolean; homes?: Home[]; error?: string }> {
    console.log('🏠 ApiService: Fetching homes...');
    const result = await this.request<{ homes: Home[] }>(ENDPOINTS.homes);
    console.log('🏠 ApiService: Homes result:', result);
    return {
      success: result.success,
      homes: result.data?.homes,
      error: result.error
    };
  }

  async createHome(homeData: { name: string; address: string }): Promise<{ success: boolean; home?: Home; error?: string }> {
    const result = await this.request<{ home: Home }>(ENDPOINTS.homes, {
      method: 'POST',
      body: JSON.stringify(homeData),
    });
    return {
      success: result.success,
      home: result.data?.home,
      error: result.error
    };
  }

  async updateHome(homeId: string, homeData: { name?: string; address?: string }): Promise<{ success: boolean; home?: Home; error?: string }> {
    const result = await this.request<{ home: Home }>(`${ENDPOINTS.homes}/${homeId}`, {
      method: 'PUT',
      body: JSON.stringify(homeData),
    });
    return {
      success: result.success,
      home: result.data?.home,
      error: result.error
    };
  }

  async deleteHome(homeId: string): Promise<{ success: boolean; error?: string }> {
    const result = await this.request(`${ENDPOINTS.homes}/${homeId}`, {
      method: 'DELETE',
    });
    return {
      success: result.success,
      error: result.error
    };
  }

  async getHome(homeId: string): Promise<{ success: boolean; home?: Home; error?: string }> {
    const result = await this.request<{ home: Home }>(`${ENDPOINTS.homes}/${homeId}`);
    return {
      success: result.success,
      home: result.data?.home,
      error: result.error
    };
  }

  // Rooms endpoints
  async getRooms(homeId: string): Promise<{ success: boolean; rooms?: Room[]; error?: string }> {
    const result = await this.request<{ rooms: Room[] }>(`${ENDPOINTS.rooms}?home_id=${homeId}`);
    return {
      success: result.success,
      rooms: result.data?.rooms,
      error: result.error
    };
  }

  async createRoom(roomData: { home_id: string; name: string; room_type: string }): Promise<{ success: boolean; room?: Room; error?: string }> {
    const result = await this.request<{ room: Room }>(ENDPOINTS.rooms, {
      method: 'POST',
      body: JSON.stringify(roomData),
    });
    return {
      success: result.success,
      room: result.data?.room,
      error: result.error
    };
  }

  async updateRoom(roomId: string, roomData: any): Promise<{ success: boolean; room?: Room; error?: string }> {
    const result = await this.request<{ room: Room }>(`${ENDPOINTS.rooms}/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify(roomData),
    });
    return {
      success: result.success,
      room: result.data?.room,
      error: result.error
    };
  }

  async deleteRoom(roomId: string): Promise<{ success: boolean; error?: string }> {
    const result = await this.request(`${ENDPOINTS.rooms}/${roomId}`, {
      method: 'DELETE',
    });
    return {
      success: result.success,
      error: result.error
    };
  }

  // Items endpoints
  async getItems(roomId: string): Promise<{ success: boolean; items?: Item[]; error?: string }> {
    const result = await this.request<{ items: Item[] }>(`${ENDPOINTS.items}?room_id=${roomId}`);
    return {
      success: result.success,
      items: result.data?.items,
      error: result.error
    };
  }

  async createItem(itemData: any): Promise<{ success: boolean; item?: Item; error?: string }> {
    const result = await this.request<{ item: Item }>(ENDPOINTS.items, {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
    return {
      success: result.success,
      item: result.data?.item,
      error: result.error
    };
  }

  async updateItem(itemId: string, itemData: any): Promise<{ success: boolean; item?: Item; error?: string }> {
    const result = await this.request<{ item: Item }>(`${ENDPOINTS.items}/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
    return {
      success: result.success,
      item: result.data?.item,
      error: result.error
    };
  }

  async deleteItem(itemId: string): Promise<{ success: boolean; error?: string }> {
    const result = await this.request(`${ENDPOINTS.items}/${itemId}`, {
      method: 'DELETE',
    });
    return {
      success: result.success,
      error: result.error
    };
  }

  // Push notifications
  async storePushToken(pushToken: string): Promise<{ success: boolean; error?: string }> {
    const result = await this.request(ENDPOINTS.notifications.pushToken, {
      method: 'POST',
      body: JSON.stringify({ pushToken }),
    });
    return {
      success: result.success,
      error: result.error
    };
  }
}

export const apiService = new ApiService();
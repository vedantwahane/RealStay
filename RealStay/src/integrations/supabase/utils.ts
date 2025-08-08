import { supabase } from './client';
import type { Database } from './types';

// Type aliases for better readability
export type Hotel = Database['public']['Tables']['hotels']['Row'];
export type HotelInsert = Database['public']['Tables']['hotels']['Insert'];
export type HotelUpdate = Database['public']['Tables']['hotels']['Update'];

export type Room = Database['public']['Tables']['rooms']['Row'];
export type RoomInsert = Database['public']['Tables']['rooms']['Insert'];
export type RoomUpdate = Database['public']['Tables']['rooms']['Update'];

export type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

// Hotel utilities
export const hotelUtils = {
  async getAll() {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  async getByCity(city: string) {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .ilike('city', `%${city}%`)
      .order('rating', { ascending: false });
    
    return { data, error };
  },

  async create(hotel: HotelInsert) {
    const { data, error } = await supabase
      .from('hotels')
      .insert(hotel)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, updates: HotelUpdate) {
    const { data, error } = await supabase
      .from('hotels')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('hotels')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

// Room utilities
export const roomUtils = {
  async getByHotelId(hotelId: string) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('price_per_night', { ascending: true });
    
    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  async create(room: RoomInsert) {
    const { data, error } = await supabase
      .from('rooms')
      .insert(room)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, updates: RoomUpdate) {
    const { data, error } = await supabase
      .from('rooms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  }
};

// Booking utilities
export const bookingUtils = {
  async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        hotels (
          name,
          city,
          image_url
        ),
        rooms (
          room_type,
          price_per_night
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async create(booking: BookingInsert) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, updates: BookingUpdate) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async cancel(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  }
};

// Profile utilities
export const profileUtils = {
  async getById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  async create(profile: ProfileInsert) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, updates: ProfileUpdate) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  }
};

// Review utilities
export const reviewUtils = {
  async getByHotelId(hotelId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles (
          full_name
        )
      `)
      .eq('hotel_id', hotelId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async create(review: ReviewInsert) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, updates: ReviewUpdate) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

// Auth utilities
export const authUtils = {
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  }
}; 
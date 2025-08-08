# Supabase Integration Setup

Your RealStay application is now fully connected to Supabase! Here's what's been set up and how to use it.

## 🎉 What's Already Configured

### ✅ Supabase Client

- **Location**: `src/integrations/supabase/client.ts`
- **Features**:
  - Environment variable support for better security
  - TypeScript types integration
  - Authentication with localStorage persistence
  - Auto token refresh

### ✅ Database Schema

Your Supabase database includes these tables:

- **hotels** - Hotel information and details
- **rooms** - Room types and availability
- **bookings** - User reservations
- **profiles** - User profile information
- **reviews** - Hotel reviews and ratings

### ✅ Authentication Context

- **Location**: `src/contexts/AuthContext.tsx`
- **Features**:
  - User sign up/sign in/sign out
  - Session management
  - Toast notifications for auth events
  - Automatic auth state updates

### ✅ Utility Functions

- **Location**: `src/integrations/supabase/utils.ts`
- **Features**:
  - Type-safe database operations
  - CRUD operations for all tables
  - Error handling
  - Relationship queries

### ✅ React Query Hooks

- **Location**: `src/hooks/use-supabase.ts`
- **Features**:
  - Caching and state management
  - Optimistic updates
  - Error handling with toast notifications
  - Automatic query invalidation

## 🚀 How to Use

### 1. Basic Data Fetching

```tsx
import { useHotels, useHotel } from "@/hooks/use-supabase";

function HotelsList() {
  const { data: hotels, isLoading, error } = useHotels();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {hotels?.data?.map((hotel) => (
        <div key={hotel.id}>{hotel.name}</div>
      ))}
    </div>
  );
}
```

### 2. Creating Data

```tsx
import { useCreateHotel } from "@/hooks/use-supabase";

function AddHotel() {
  const createHotel = useCreateHotel();

  const handleSubmit = (hotelData) => {
    createHotel.mutate(hotelData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button disabled={createHotel.isPending}>
        {createHotel.isPending ? "Creating..." : "Create Hotel"}
      </button>
    </form>
  );
}
```

### 3. Authentication

```tsx
import { useAuth } from "@/contexts/AuthContext";

function AuthComponent() {
  const { user, signIn, signOut } = useAuth();

  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}!</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn(email, password);
      }}
    >
      {/* Your sign in form */}
    </form>
  );
}
```

### 4. Direct Supabase Client Usage

```tsx
import { supabase } from "@/integrations/supabase/client";
import { hotelUtils } from "@/integrations/supabase/utils";

// Using the client directly
const { data, error } = await supabase.from("hotels").select("*");

// Using utility functions
const { data, error } = await hotelUtils.getAll();
```

## 🔧 Available Hooks

### Hotel Operations

- `useHotels()` - Get all hotels
- `useHotel(id)` - Get specific hotel
- `useHotelsByCity(city)` - Get hotels by city
- `useCreateHotel()` - Create new hotel
- `useUpdateHotel()` - Update hotel

### Room Operations

- `useRoomsByHotel(hotelId)` - Get rooms for a hotel
- `useRoom(id)` - Get specific room
- `useCreateRoom()` - Create new room

### Booking Operations

- `useUserBookings()` - Get user's bookings
- `useCreateBooking()` - Create new booking
- `useCancelBooking()` - Cancel booking

### Profile Operations

- `useProfile(id)` - Get user profile
- `useUpdateProfile()` - Update profile

### Review Operations

- `useReviewsByHotel(hotelId)` - Get reviews for a hotel
- `useCreateReview()` - Create new review
- `useUpdateReview()` - Update review
- `useDeleteReview()` - Delete review

## 🔐 Environment Variables (Optional)

For better security, create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Database Schema Overview

### Hotels Table

```sql
- id (uuid, primary key)
- name (text)
- description (text)
- city (text)
- country (text)
- location (text)
- price_per_night (numeric)
- rating (numeric)
- image_url (text)
- amenities (text[])
- created_at (timestamp)
- updated_at (timestamp)
```

### Rooms Table

```sql
- id (uuid, primary key)
- hotel_id (uuid, foreign key)
- room_type (text)
- capacity (integer)
- price_per_night (numeric)
- available_rooms (integer)
- amenities (text[])
- created_at (timestamp)
- updated_at (timestamp)
```

### Bookings Table

```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- hotel_id (uuid, foreign key)
- room_id (uuid, foreign key)
- check_in_date (date)
- check_out_date (date)
- guests (integer)
- total_amount (numeric)
- status (text)
- payment_method (text)
- payment_transaction_id (text)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🎯 Example Component

Check out `src/components/SupabaseExample.tsx` for a complete example of how to use the Supabase integration with forms, data fetching, and mutations.

## 🚨 Important Notes

1. **Authentication**: The AuthContext is already integrated into your App component
2. **Error Handling**: All hooks include error handling with toast notifications
3. **Type Safety**: Full TypeScript support with generated types
4. **Caching**: React Query handles caching and state management
5. **Real-time**: Supabase supports real-time subscriptions if needed

## 🔄 Next Steps

1. **Test the integration** by running your app and checking the example component
2. **Add more features** using the provided hooks and utilities
3. **Customize the schema** if needed by modifying your Supabase database
4. **Add real-time features** using Supabase subscriptions
5. **Implement row-level security** in your Supabase dashboard

Your Supabase integration is ready to use! 🎉

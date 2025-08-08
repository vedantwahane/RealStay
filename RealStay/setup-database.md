# Database Setup Instructions

Your Supabase database is now configured with the correct credentials. Follow these steps to set up your database schema:

## 🚀 Quick Setup (Recommended)

### Option 1: Using Supabase Dashboard (Easiest)

1. **Go to your Supabase Dashboard**

   - Visit: https://supabase.com/dashboard
   - Select your project: `nkusxgyiafypnglhdpju`

2. **Navigate to SQL Editor**

   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the migrations in order:**
   - Copy and paste each migration file content
   - Run them in this order:
     1. `20250106000000_create_hotels_table.sql`
     2. `20250106000001_create_rooms_table.sql`
     3. `20250106000002_create_profiles_table.sql`
     4. `20250106000003_create_bookings_table.sql`
     5. `20250106000004_create_reviews_table.sql`
     6. `20250106000005_create_functions.sql`
     7. `20250106000006_insert_sample_data.sql`

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref nkusxgyiafypnglhdpju

# Push the migrations
supabase db push
```

## 📊 What's Being Created

### Tables:

- **hotels** - Hotel information and details
- **rooms** - Room types and availability for each hotel
- **profiles** - User profile information
- **bookings** - User reservations
- **reviews** - Hotel reviews and ratings

### Features:

- ✅ **Row Level Security (RLS)** - Secure data access
- ✅ **Automatic profile creation** - When users sign up
- ✅ **Rating calculations** - Automatic hotel rating updates
- ✅ **Sample data** - 5 hotels with 15 rooms total
- ✅ **Utility functions** - For booking calculations

### Sample Data:

- 5 luxury hotels across different cities
- Various room types (Standard, Suite, Villa, etc.)
- Realistic pricing and amenities
- Beautiful hotel images from Unsplash

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **User-specific data access** - Users can only see their own bookings
- **Public read access** - Anyone can view hotels and reviews
- **Authenticated write access** - Only logged-in users can create bookings

## 🧪 Testing Your Setup

After running the migrations, you can test the connection by:

1. **Starting your development server:**

   ```bash
   npm run dev
   ```

2. **Adding the example component to any page:**

   ```tsx
   import { SupabaseExample } from "@/components/SupabaseExample";
   ```

3. **Check the browser console** for any connection errors

## 🎯 Next Steps

Once your database is set up:

1. **Test the connection** using the example component
2. **Create user accounts** to test authentication
3. **Add more hotels** using the admin interface
4. **Implement booking functionality** in your app
5. **Add payment integration** for real bookings

Your RealStay application will be fully functional with a complete hotel booking system! 🎉

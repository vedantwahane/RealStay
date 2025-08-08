-- Create rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
    room_type TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    price_per_night DECIMAL(10,2) NOT NULL,
    available_rooms INTEGER NOT NULL DEFAULT 0 CHECK (available_rooms >= 0),
    amenities TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_rooms_hotel_id ON public.rooms(hotel_id);
CREATE INDEX IF NOT EXISTS idx_rooms_price ON public.rooms(price_per_night);

-- Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read rooms
CREATE POLICY "Allow public read access to rooms" ON public.rooms
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert rooms
CREATE POLICY "Allow authenticated users to insert rooms" ON public.rooms
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update rooms
CREATE POLICY "Allow authenticated users to update rooms" ON public.rooms
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete rooms
CREATE POLICY "Allow authenticated users to delete rooms" ON public.rooms
    FOR DELETE USING (auth.role() = 'authenticated'); 
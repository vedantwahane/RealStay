-- Create hotels table
CREATE TABLE IF NOT EXISTS public.hotels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    image_url TEXT,
    amenities TEXT[] DEFAULT '{}',
    accessibility_amenities TEXT[] DEFAULT '{}',
    entertainment_amenities TEXT[] DEFAULT '{}',
    family_amenities TEXT[] DEFAULT '{}',
    kitchen_amenities TEXT[] DEFAULT '{}',
    outdoor_amenities TEXT[] DEFAULT '{}',
    safety_amenities TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_hotels_city ON public.hotels(city);
CREATE INDEX IF NOT EXISTS idx_hotels_rating ON public.hotels(rating);

-- Enable Row Level Security
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read hotels
CREATE POLICY "Allow public read access to hotels" ON public.hotels
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert hotels
CREATE POLICY "Allow authenticated users to insert hotels" ON public.hotels
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update hotels
CREATE POLICY "Allow authenticated users to update hotels" ON public.hotels
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete hotels
CREATE POLICY "Allow authenticated users to delete hotels" ON public.hotels
    FOR DELETE USING (auth.role() = 'authenticated'); 
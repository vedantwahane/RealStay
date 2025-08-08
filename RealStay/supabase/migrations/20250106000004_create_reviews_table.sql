-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, hotel_id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_hotel_id ON public.reviews(hotel_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read reviews
CREATE POLICY "Allow public read access to reviews" ON public.reviews
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert their own reviews
CREATE POLICY "Users can insert own reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own reviews
CREATE POLICY "Users can update own reviews" ON public.reviews
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own reviews
CREATE POLICY "Users can delete own reviews" ON public.reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to update hotel rating when reviews change
CREATE OR REPLACE FUNCTION update_hotel_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.hotels
    SET rating = (
        SELECT AVG(rating)::DECIMAL(3,2)
        FROM public.reviews
        WHERE hotel_id = COALESCE(NEW.hotel_id, OLD.hotel_id)
    )
    WHERE id = COALESCE(NEW.hotel_id, OLD.hotel_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update hotel rating when reviews are inserted
CREATE OR REPLACE TRIGGER update_hotel_rating_on_insert
    AFTER INSERT ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_hotel_rating();

-- Create trigger to update hotel rating when reviews are updated
CREATE OR REPLACE TRIGGER update_hotel_rating_on_update
    AFTER UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_hotel_rating();

-- Create trigger to update hotel rating when reviews are deleted
CREATE OR REPLACE TRIGGER update_hotel_rating_on_delete
    AFTER DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_hotel_rating(); 
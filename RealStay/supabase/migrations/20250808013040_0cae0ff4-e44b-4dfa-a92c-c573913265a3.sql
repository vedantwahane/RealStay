-- Enforce review authenticity: only users with a confirmed/completed booking for the same hotel can create reviews

-- Enable Row Level Security on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews"
ON public.reviews
FOR SELECT
USING (true);

-- Only users with a qualifying booking can insert a review for that hotel
DROP POLICY IF EXISTS "Users with confirmed booking can insert review" ON public.reviews;
CREATE POLICY "Users with confirmed booking can insert review"
ON public.reviews
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.user_id = auth.uid()
      AND b.hotel_id = reviews.hotel_id
      AND b.status IN ('confirmed','completed')
  )
);

-- Users can update their own reviews
DROP POLICY IF EXISTS "Users can update own review" ON public.reviews;
CREATE POLICY "Users can update own review"
ON public.reviews
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
DROP POLICY IF EXISTS "Users can delete own review" ON public.reviews;
CREATE POLICY "Users can delete own review"
ON public.reviews
FOR DELETE
USING (auth.uid() = user_id);

-- Optional: prevent duplicate reviews per hotel by same user
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'uniq_review_user_hotel'
  ) THEN
    ALTER TABLE public.reviews
    ADD CONSTRAINT uniq_review_user_hotel UNIQUE (user_id, hotel_id);
  END IF;
END $$;
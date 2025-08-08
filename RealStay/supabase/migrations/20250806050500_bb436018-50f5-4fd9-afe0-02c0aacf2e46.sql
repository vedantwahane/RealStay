-- Add payment integration fields to bookings table
ALTER TABLE public.bookings ADD COLUMN payment_method TEXT DEFAULT 'pending';
ALTER TABLE public.bookings ADD COLUMN payment_transaction_id TEXT;
ALTER TABLE public.bookings ADD COLUMN payment_amount NUMERIC;

-- Add constraint to ensure only users who booked can review
CREATE OR REPLACE FUNCTION check_user_booked_hotel(user_id_param UUID, hotel_id_param UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE user_id = user_id_param 
    AND hotel_id = hotel_id_param 
    AND status = 'confirmed'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update reviews policy to only allow users who booked
DROP POLICY IF EXISTS "Users can create their own reviews" ON public.reviews;
CREATE POLICY "Users can create reviews for booked hotels" ON public.reviews
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND 
  check_user_booked_hotel(auth.uid(), hotel_id)
);

-- Add more detailed amenities categories to hotels
ALTER TABLE public.hotels ADD COLUMN safety_amenities TEXT[] DEFAULT '{}';
ALTER TABLE public.hotels ADD COLUMN accessibility_amenities TEXT[] DEFAULT '{}'; 
ALTER TABLE public.hotels ADD COLUMN kitchen_amenities TEXT[] DEFAULT '{}';
ALTER TABLE public.hotels ADD COLUMN entertainment_amenities TEXT[] DEFAULT '{}';
ALTER TABLE public.hotels ADD COLUMN outdoor_amenities TEXT[] DEFAULT '{}';
ALTER TABLE public.hotels ADD COLUMN family_amenities TEXT[] DEFAULT '{}';

-- Update sample hotel data with categorized amenities for Indian context
UPDATE public.hotels SET 
  amenities = ARRAY['WiFi', 'Air Conditioning', 'Parking', 'Restaurant', 'Room Service'],
  safety_amenities = ARRAY['CCTV Surveillance', '24/7 Security', 'Safe Deposit Box', 'Fire Extinguisher'],
  accessibility_amenities = ARRAY['Wheelchair Accessible', 'Elevator Access', 'Accessible Bathroom'],
  kitchen_amenities = ARRAY['Tea/Coffee Maker', 'Mini Fridge', 'Microwave', 'Complimentary Water'],
  entertainment_amenities = ARRAY['Smart TV', 'Netflix Access', 'High-Speed WiFi', 'Music System'],
  outdoor_amenities = ARRAY['Balcony', 'Garden View', 'Swimming Pool', 'Terrace Access'],
  family_amenities = ARRAY['Kids Play Area', 'Baby Cot Available', 'Family Rooms', 'Laundry Service']
WHERE id IN (SELECT id FROM public.hotels LIMIT 5);
-- Function to check if a user has already booked a hotel
CREATE OR REPLACE FUNCTION check_user_booked_hotel(user_id_param UUID, hotel_id_param UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.bookings 
        WHERE user_id = user_id_param 
        AND hotel_id = hotel_id_param 
        AND status IN ('confirmed', 'pending')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get available rooms for a hotel on specific dates
CREATE OR REPLACE FUNCTION get_available_rooms(
    hotel_id_param UUID,
    check_in_date_param DATE,
    check_out_date_param DATE
)
RETURNS TABLE (
    room_id UUID,
    room_type TEXT,
    capacity INTEGER,
    price_per_night DECIMAL(10,2),
    available_rooms INTEGER,
    amenities TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        r.id,
        r.room_type,
        r.capacity,
        r.price_per_night,
        r.available_rooms,
        r.amenities
    FROM public.rooms r
    WHERE r.hotel_id = hotel_id_param
    AND r.available_rooms > 0
    AND NOT EXISTS (
        SELECT 1 FROM public.bookings b
        WHERE b.room_id = r.id
        AND b.status IN ('confirmed', 'pending')
        AND (
            (b.check_in_date <= check_in_date_param AND b.check_out_date > check_in_date_param)
            OR (b.check_in_date < check_out_date_param AND b.check_out_date >= check_out_date_param)
            OR (b.check_in_date >= check_in_date_param AND b.check_out_date <= check_out_date_param)
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate total amount for a booking
CREATE OR REPLACE FUNCTION calculate_booking_total(
    room_id_param UUID,
    check_in_date_param DATE,
    check_out_date_param DATE,
    guests_param INTEGER
)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    room_price DECIMAL(10,2);
    nights INTEGER;
    total DECIMAL(10,2);
BEGIN
    -- Get room price
    SELECT price_per_night INTO room_price
    FROM public.rooms
    WHERE id = room_id_param;
    
    -- Calculate number of nights
    nights := check_out_date_param - check_in_date_param;
    
    -- Calculate total (price per night * number of nights)
    total := room_price * nights;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
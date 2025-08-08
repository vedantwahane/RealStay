-- Insert sample hotels
INSERT INTO public.hotels (name, description, city, country, location, price_per_night, rating, image_url, amenities, accessibility_amenities, entertainment_amenities, family_amenities, kitchen_amenities, outdoor_amenities, safety_amenities) VALUES
(
    'Grand Plaza Hotel',
    'Luxurious 5-star hotel in the heart of downtown with stunning city views and world-class amenities.',
    'New York',
    'USA',
    '123 Broadway, New York, NY 10001',
    299.99,
    4.8,
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    ARRAY['Free WiFi', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Concierge'],
    ARRAY['Wheelchair accessible', 'Elevator', 'Accessible rooms'],
    ARRAY['Movie theater', 'Game room', 'Live music'],
    ARRAY['Kids club', 'Playground', 'Family rooms'],
    ARRAY['Kitchenette', 'Microwave', 'Refrigerator'],
    ARRAY['Swimming pool', 'Garden', 'Terrace'],
    ARRAY['24/7 security', 'Safe', 'Fire alarm']
),
(
    'Seaside Resort & Spa',
    'Beachfront resort offering breathtaking ocean views and exclusive spa treatments.',
    'Miami',
    'USA',
    '456 Ocean Drive, Miami Beach, FL 33139',
    399.99,
    4.9,
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    ARRAY['Private beach', 'Spa', 'Pool', 'Restaurant', 'Bar', 'Tennis court'],
    ARRAY['Wheelchair accessible', 'Beach wheelchair', 'Accessible spa'],
    ARRAY['Water sports', 'Yoga classes', 'Live entertainment'],
    ARRAY['Kids pool', 'Children activities', 'Family packages'],
    ARRAY['Full kitchen', 'Dishwasher', 'Coffee maker'],
    ARRAY['Private beach', 'Infinity pool', 'Beach cabanas'],
    ARRAY['Lifeguard', 'Security patrol', 'Emergency response']
),
(
    'Mountain View Lodge',
    'Cozy lodge nestled in the mountains with rustic charm and modern comforts.',
    'Denver',
    'USA',
    '789 Mountain Road, Denver, CO 80202',
    199.99,
    4.6,
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    ARRAY['Fireplace', 'Hot tub', 'Restaurant', 'Bar', 'Hiking trails'],
    ARRAY['Wheelchair accessible', 'Accessible trails', 'Assistive devices'],
    ARRAY['Hiking', 'Skiing', 'Board games'],
    ARRAY['Family suites', 'Kids activities', 'Pet friendly'],
    ARRAY['Kitchenette', 'Coffee maker', 'Mini fridge'],
    ARRAY['Mountain views', 'Garden', 'Fire pit'],
    ARRAY['Smoke detectors', 'First aid', 'Emergency contacts']
),
(
    'Urban Boutique Hotel',
    'Modern boutique hotel with contemporary design and personalized service.',
    'Los Angeles',
    'USA',
    '321 Sunset Blvd, Los Angeles, CA 90012',
    249.99,
    4.7,
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ARRAY['Rooftop bar', 'Gym', 'Restaurant', 'Free WiFi', 'Concierge'],
    ARRAY['Wheelchair accessible', 'Elevator', 'Accessible rooms'],
    ARRAY['Rooftop events', 'Art gallery', 'Wine tasting'],
    ARRAY['Family rooms', 'Kids menu', 'Babysitting'],
    ARRAY['Kitchenette', 'Coffee maker', 'Mini bar'],
    ARRAY['Rooftop terrace', 'Garden', 'City views'],
    ARRAY['24/7 security', 'Safe', 'CCTV']
),
(
    'Historic Grand Hotel',
    'Elegant historic hotel with classic architecture and timeless luxury.',
    'Chicago',
    'USA',
    '654 Michigan Ave, Chicago, IL 60611',
    349.99,
    4.8,
    'https://images.unsplash.com/photo-1571896349842-33c89424dee2?w=800',
    ARRAY['Historic lobby', 'Fine dining', 'Spa', 'Bar', 'Concierge'],
    ARRAY['Wheelchair accessible', 'Historic accessibility', 'Assistive devices'],
    ARRAY['Historic tours', 'Classical music', 'Art exhibitions'],
    ARRAY['Family packages', 'Kids programs', 'Historic education'],
    ARRAY['Room service', 'Mini bar', 'Coffee service'],
    ARRAY['Historic courtyard', 'Garden', 'City views'],
    ARRAY['Historic preservation', 'Security', 'Emergency systems']
);

-- Insert sample rooms for each hotel
INSERT INTO public.rooms (hotel_id, room_type, capacity, price_per_night, available_rooms, amenities) VALUES
-- Grand Plaza Hotel rooms
((SELECT id FROM public.hotels WHERE name = 'Grand Plaza Hotel'), 'Standard Room', 2, 299.99, 10, ARRAY['King bed', 'City view', 'Free WiFi', 'Mini bar']),
((SELECT id FROM public.hotels WHERE name = 'Grand Plaza Hotel'), 'Deluxe Suite', 4, 499.99, 5, ARRAY['King bed', 'Living room', 'City view', 'Free WiFi', 'Mini bar', 'Spa bath']),
((SELECT id FROM public.hotels WHERE name = 'Grand Plaza Hotel'), 'Presidential Suite', 6, 999.99, 2, ARRAY['Multiple bedrooms', 'Full kitchen', 'City view', 'Free WiFi', 'Mini bar', 'Spa bath', 'Butler service']),

-- Seaside Resort & Spa rooms
((SELECT id FROM public.hotels WHERE name = 'Seaside Resort & Spa'), 'Ocean View Room', 2, 399.99, 8, ARRAY['King bed', 'Ocean view', 'Balcony', 'Free WiFi']),
((SELECT id FROM public.hotels WHERE name = 'Seaside Resort & Spa'), 'Beachfront Suite', 4, 699.99, 4, ARRAY['King bed', 'Ocean view', 'Private balcony', 'Free WiFi', 'Kitchenette']),
((SELECT id FROM public.hotels WHERE name = 'Seaside Resort & Spa'), 'Villa', 8, 1299.99, 2, ARRAY['Multiple bedrooms', 'Private pool', 'Ocean view', 'Full kitchen', 'Free WiFi']),

-- Mountain View Lodge rooms
((SELECT id FROM public.hotels WHERE name = 'Mountain View Lodge'), 'Cozy Room', 2, 199.99, 12, ARRAY['Queen bed', 'Mountain view', 'Fireplace', 'Free WiFi']),
((SELECT id FROM public.hotels WHERE name = 'Mountain View Lodge'), 'Family Suite', 6, 399.99, 6, ARRAY['Multiple beds', 'Mountain view', 'Fireplace', 'Kitchenette', 'Free WiFi']),
((SELECT id FROM public.hotels WHERE name = 'Mountain View Lodge'), 'Cabin', 4, 299.99, 4, ARRAY['Queen bed', 'Mountain view', 'Fireplace', 'Kitchenette', 'Free WiFi', 'Hot tub']),

-- Urban Boutique Hotel rooms
((SELECT id FROM public.hotels WHERE name = 'Urban Boutique Hotel'), 'Boutique Room', 2, 249.99, 15, ARRAY['Queen bed', 'City view', 'Free WiFi', 'Mini bar']),
((SELECT id FROM public.hotels WHERE name = 'Urban Boutique Hotel'), 'Designer Suite', 4, 449.99, 8, ARRAY['King bed', 'City view', 'Living room', 'Free WiFi', 'Mini bar']),
((SELECT id FROM public.hotels WHERE name = 'Urban Boutique Hotel'), 'Penthouse', 6, 899.99, 2, ARRAY['Multiple bedrooms', 'Rooftop access', 'City view', 'Full kitchen', 'Free WiFi', 'Mini bar']),

-- Historic Grand Hotel rooms
((SELECT id FROM public.hotels WHERE name = 'Historic Grand Hotel'), 'Historic Room', 2, 349.99, 10, ARRAY['King bed', 'Historic charm', 'Free WiFi', 'Mini bar']),
((SELECT id FROM public.hotels WHERE name = 'Historic Grand Hotel'), 'Grand Suite', 4, 649.99, 5, ARRAY['King bed', 'Historic charm', 'Living room', 'Free WiFi', 'Mini bar']),
((SELECT id FROM public.hotels WHERE name = 'Historic Grand Hotel'), 'Royal Suite', 8, 1299.99, 2, ARRAY['Multiple bedrooms', 'Historic charm', 'Full kitchen', 'Free WiFi', 'Mini bar', 'Butler service']); 
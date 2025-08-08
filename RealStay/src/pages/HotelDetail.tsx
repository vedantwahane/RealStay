import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PaymentModal } from '@/components/PaymentModal';
import { 
  MapPin, Star, Wifi, Car, Coffee, Users, Calendar, Shield, 
  Accessibility, ChefHat, Tv, TreePine, Baby, Camera, Heart,
  Share, Grid3X3, Phone, CheckCircle
} from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  description: string;
  price_per_night: number;
  rating: number;
  image_url: string;
  amenities: string[];
  safety_amenities: string[];
  accessibility_amenities: string[];
  kitchen_amenities: string[];
  entertainment_amenities: string[];
  outdoor_amenities: string[];
  family_amenities: string[];
}

interface Room {
  id: string;
  room_type: string;
  capacity: number;
  price_per_night: number;
  available_rooms: number;
  amenities: string[];
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
}

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchHotelData();
      checkUserBooking();
    }
  }, [id, user]);

  const checkUserBooking = async () => {
    if (!user || !id) return;
    
    try {
      const { data } = await supabase
        .from('bookings')
        .select('id')
        .eq('user_id', user.id)
        .eq('hotel_id', id)
        .eq('status', 'confirmed')
        .limit(1);
      
      setHasBooked(data && data.length > 0);
    } catch (error) {
      console.error('Error checking booking:', error);
    }
  };

  const fetchHotelData = async () => {
    try {
      // Fetch hotel details
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('*')
        .eq('id', id)
        .single();

      if (hotelError) throw hotelError;
      setHotel(hotelData);

      // Fetch rooms
      const { data: roomsData, error: roomsError } = await supabase
        .from('rooms')
        .select('*')
        .eq('hotel_id', id);

      if (roomsError) throw roomsError;
      setRooms(roomsData || []);

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('hotel_id', id)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;
      setReviews(reviewsData || []);

    } catch (error) {
      console.error('Error fetching hotel data:', error);
      toast({
        title: "Error",
        description: "Failed to load hotel information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentMethod: string, transactionId?: string) => {
    if (!user || !selectedRoom || !checkInDate || !checkOutDate) return;

    const selectedRoomData = rooms.find(r => r.id === selectedRoom);
    if (!selectedRoomData) return;

    const nights = Math.ceil(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24)
    );
    
    const totalAmount = selectedRoomData.price_per_night * nights;

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          hotel_id: id,
          room_id: selectedRoom,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests: parseInt(guests),
          total_amount: totalAmount,
          payment_method: paymentMethod,
          payment_transaction_id: transactionId,
          payment_amount: paymentMethod === 'pending' ? null : totalAmount,
          status: paymentMethod === 'metamask' ? 'confirmed' : 'pending'
        });

      if (error) throw error;

      setHasBooked(true);
      navigate('/my-bookings');

    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking failed",
        description: "There was an error creating your booking",
        variant: "destructive"
      });
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!newReview.comment.trim()) {
      toast({
        title: "Missing comment",
        description: "Please write a review comment",
        variant: "destructive"
      });
      return;
    }

    setSubmittingReview(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          hotel_id: id,
          rating: newReview.rating,
          comment: newReview.comment
        });

      if (error) throw error;

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback."
      });

      setNewReview({ rating: 5, comment: '' });
      fetchHotelData(); // Refresh reviews

    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Failed to submit review",
        description: "There was an error submitting your review",
        variant: "destructive"
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const getAmenityIcon = (amenity: string, category?: string) => {
    const iconClass = "h-4 w-4";
    switch (amenity.toLowerCase()) {
      case 'wifi':
      case 'high-speed wifi':
        return <Wifi className={iconClass} />;
      case 'parking':
        return <Car className={iconClass} />;
      case 'breakfast':
      case 'tea/coffee maker':
        return <Coffee className={iconClass} />;
      case 'cctv surveillance':
      case '24/7 security':
      case 'safe deposit box':
      case 'fire extinguisher':
        return <Shield className={iconClass} />;
      case 'wheelchair accessible':
      case 'elevator access':
      case 'accessible bathroom':
        return <Accessibility className={iconClass} />;
      case 'mini fridge':
      case 'microwave':
        return <ChefHat className={iconClass} />;
      case 'smart tv':
      case 'netflix access':
      case 'music system':
        return <Tv className={iconClass} />;
      case 'balcony':
      case 'garden view':
      case 'swimming pool':
      case 'terrace access':
        return <TreePine className={iconClass} />;
      case 'kids play area':
      case 'baby cot available':
      case 'family rooms':
        return <Baby className={iconClass} />;
      default:
        return <CheckCircle className={iconClass} />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety': return <Shield className="h-5 w-5" />;
      case 'accessibility': return <Accessibility className="h-5 w-5" />;
      case 'kitchen': return <ChefHat className="h-5 w-5" />;
      case 'entertainment': return <Tv className="h-5 w-5" />;
      case 'outdoor': return <TreePine className="h-5 w-5" />;
      case 'family': return <Baby className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
    }
  };

  const renderAmenityCategory = (title: string, amenities: string[], category: string) => {
    if (!amenities || amenities.length === 0) return null;
    
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          {getCategoryIcon(category)}
          <h4 className="font-semibold text-base">{title}</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              {getAmenityIcon(amenity, category)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getBookingButtonProps = () => {
    if (!user) {
      return {
        onClick: () => navigate('/auth'),
        children: 'Sign in to Book'
      };
    }
    
    if (!selectedRoom || !checkInDate || !checkOutDate) {
      return {
        disabled: true,
        children: 'Select Room & Dates'
      };
    }

    const selectedRoomData = rooms.find(r => r.id === selectedRoom);
    const nights = checkInDate && checkOutDate ? 
      Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24)) : 0;
    const totalAmount = selectedRoomData ? selectedRoomData.price_per_night * nights : 0;

    return {
      children: `Book Now - ₹${totalAmount.toLocaleString()}`,
      paymentProps: {
        totalAmount,
        nights,
        hotelName: hotel?.name || '',
        roomType: selectedRoomData?.room_type || '',
        onPaymentSuccess: handlePaymentSuccess
      }
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏨</div>
          <h3 className="text-xl font-semibold mb-2">Hotel not found</h3>
          <Button onClick={() => navigate('/hotels')}>Browse Hotels</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 animate-fade-in">
      <div className="container mx-auto">
        {/* Hotel Header with Photo Gallery */}
        <div className="space-y-6 mb-8">
          {/* Title and Location */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">{hotel.name}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.location}, {hotel.city}, {hotel.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-80 md:h-96">
            <div className="md:col-span-2 md:row-span-2">
              {hotel.image_url ? (
                <img 
                  src={hotel.image_url} 
                  alt={hotel.name}
                  className="w-full h-full object-cover rounded-l-lg cursor-pointer hover:brightness-90 transition-all hover-scale"
                  onClick={() => setShowAllPhotos(true)}
                />
              ) : (
                <div className="w-full h-full bg-muted rounded-l-lg flex items-center justify-center text-8xl cursor-pointer hover:bg-muted/80 transition-colors">
                  🏨
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <div className="w-full h-full bg-muted/50 rounded-tr-lg flex items-center justify-center text-4xl">
                🛏️
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-full bg-muted/30 flex items-center justify-center text-4xl">
                🏊‍♂️
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-full bg-muted/50 flex items-center justify-center text-4xl">
                🍳
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="w-full h-full bg-muted/30 rounded-br-lg flex items-center justify-center text-4xl">
                <Button 
                  variant="outline" 
                  className="absolute bottom-2 right-2"
                  onClick={() => setShowAllPhotos(true)}
                >
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  Show all photos
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host and Property Info */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Entire hotel in {hotel.city}</h2>
                  <p className="text-muted-foreground">{rooms.length} room types available</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
              </div>
              
              <Separator />
              
              <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
            </div>

            {/* What this place offers */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">What this place offers</h3>
              <div className="space-y-6">
                {renderAmenityCategory("Safety & Security", hotel.safety_amenities, "safety")}
                {renderAmenityCategory("Accessibility", hotel.accessibility_amenities, "accessibility")}
                {renderAmenityCategory("Kitchen & Dining", hotel.kitchen_amenities, "kitchen")}
                {renderAmenityCategory("Entertainment", hotel.entertainment_amenities, "entertainment")}
                {renderAmenityCategory("Outdoor", hotel.outdoor_amenities, "outdoor")}
                {renderAmenityCategory("Family", hotel.family_amenities, "family")}
                
                {/* General Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">General</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location Map */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Location</h3>
              <div className="rounded-lg overflow-hidden border">
                <iframe
                  title={`${hotel.name} location on map`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent((hotel.location ? hotel.location + ', ' : '') + hotel.city + ', ' + hotel.country)}&output=embed`}
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
            </div>

            {/* Tabs for Reviews */}
            <Tabs defaultValue="reviews" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="write-review" disabled={!hasBooked}>
                  {hasBooked ? 'Write Review' : 'Book to Review'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="space-y-6">
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💭</div>
                    <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                    <p className="text-muted-foreground">Be the first to share your experience!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="write-review" className="space-y-6">
                {hasBooked ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Write a Review</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Rating</Label>
                        <div className="flex items-center space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-6 w-6 cursor-pointer transition-colors ${
                                star <= newReview.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 hover:text-yellow-200'
                              }`}
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea
                          id="comment"
                          placeholder="Share your experience..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          rows={4}
                        />
                      </div>

                      <Button 
                        onClick={handleSubmitReview}
                        disabled={submittingReview}
                        className="w-full"
                      >
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <h3 className="text-lg font-semibold mb-2">Book to Review</h3>
                      <p className="text-muted-foreground mb-4">
                        You must book and stay at this hotel to write a review
                      </p>
                      <Button variant="outline">View Available Rooms</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Booking Widget */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-2xl font-bold">₹{hotel.price_per_night.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">per night</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="checkin">Check-in</Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Check-out</Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Guests Selection */}
                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Guest{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Room Selection */}
                <div>
                  <Label>Select Room Type</Label>
                  <div className="space-y-2 mt-2">
                    {rooms.map((room) => (
                      <Card 
                        key={room.id}
                        className={`cursor-pointer transition-colors p-3 ${
                          selectedRoom === room.id ? 'ring-2 ring-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setSelectedRoom(room.id)}
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{room.room_type}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            Up to {room.capacity} guests
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">₹{room.price_per_night}/night</span>
                            <span className="text-xs text-muted-foreground">
                              {room.available_rooms} available
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                {(() => {
                  const buttonProps = getBookingButtonProps();
                  return buttonProps.paymentProps ? (
                    <PaymentModal {...buttonProps.paymentProps}>
                      <Button className="w-full" size="lg">
                        {buttonProps.children}
                      </Button>
                    </PaymentModal>
                  ) : (
                    <Button 
                      className="w-full" 
                      size="lg"
                      disabled={buttonProps.disabled}
                      onClick={buttonProps.onClick}
                    >
                      {buttonProps.children}
                    </Button>
                  );
                })()}

                <div className="text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>You won't be charged yet</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  hotelUtils, 
  roomUtils, 
  bookingUtils, 
  profileUtils, 
  reviewUtils,
  type Hotel,
  type Room,
  type Booking,
  type Profile,
  type Review
} from '@/integrations/supabase/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Hotel hooks
export const useHotels = () => {
  return useQuery({
    queryKey: ['hotels'],
    queryFn: hotelUtils.getAll,
  });
};

export const useHotel = (id: string) => {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => hotelUtils.getById(id),
    enabled: !!id,
  });
};

export const useHotelsByCity = (city: string) => {
  return useQuery({
    queryKey: ['hotels', 'city', city],
    queryFn: () => hotelUtils.getByCity(city),
    enabled: !!city,
  });
};

export const useCreateHotel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: hotelUtils.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      toast({
        title: "Hotel created",
        description: "Hotel has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateHotel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Hotel> }) =>
      hotelUtils.update(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      queryClient.invalidateQueries({ queryKey: ['hotel', data.data?.id] });
      toast({
        title: "Hotel updated",
        description: "Hotel has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Room hooks
export const useRoomsByHotel = (hotelId: string) => {
  return useQuery({
    queryKey: ['rooms', 'hotel', hotelId],
    queryFn: () => roomUtils.getByHotelId(hotelId),
    enabled: !!hotelId,
  });
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: () => roomUtils.getById(id),
    enabled: !!id,
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: roomUtils.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['rooms', 'hotel', data.data?.hotel_id] });
      toast({
        title: "Room created",
        description: "Room has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Booking hooks
export const useUserBookings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['bookings', 'user', user?.id],
    queryFn: () => bookingUtils.getUserBookings(user!.id),
    enabled: !!user?.id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: bookingUtils.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking created",
        description: "Your booking has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: bookingUtils.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking cancelled",
        description: "Your booking has been successfully cancelled.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Profile hooks
export const useProfile = (id: string) => {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => profileUtils.getById(id),
    enabled: !!id,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Profile> }) =>
      profileUtils.update(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data.data?.id] });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Review hooks
export const useReviewsByHotel = (hotelId: string) => {
  return useQuery({
    queryKey: ['reviews', 'hotel', hotelId],
    queryFn: () => reviewUtils.getByHotelId(hotelId),
    enabled: !!hotelId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: reviewUtils.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'hotel', data.data?.hotel_id] });
      toast({
        title: "Review submitted",
        description: "Your review has been successfully submitted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Review> }) =>
      reviewUtils.update(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Review updated",
        description: "Your review has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: reviewUtils.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Review deleted",
        description: "Your review has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}; 
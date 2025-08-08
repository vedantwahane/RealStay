import React, { useState } from 'react';
import { useHotels, useCreateHotel } from '@/hooks/use-supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

export function SupabaseExample() {
  const { user } = useAuth();
  const { data: hotels, isLoading, error } = useHotels();
  const createHotel = useCreateHotel();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    country: '',
    location: '',
    price_per_night: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createHotel.mutate({
      ...formData,
      price_per_night: Number(formData.price_per_night),
      amenities: [],
      accessibility_amenities: [],
      entertainment_amenities: [],
      family_amenities: [],
      kitchen_amenities: [],
      outdoor_amenities: [],
      safety_amenities: [],
    });
    setFormData({
      name: '',
      description: '',
      city: '',
      country: '',
      location: '',
      price_per_night: 0,
    });
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading hotels...</div>;
  }

  if (error) {
    return <div className="flex justify-center p-8 text-red-500">Error loading hotels: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration Example</CardTitle>
          <CardDescription>
            This component demonstrates how to use the Supabase integration with React Query.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Current User</h3>
              <p className="text-sm text-gray-600">
                {user ? `Logged in as: ${user.email}` : 'Not logged in'}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Add New Hotel</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Hotel Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Night</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price_per_night}
                      onChange={(e) => setFormData({ ...formData, price_per_night: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button type="submit" disabled={createHotel.isPending}>
                  {createHotel.isPending ? 'Creating...' : 'Create Hotel'}
                </Button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Hotels ({hotels?.data?.length || 0})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels?.data?.map((hotel) => (
                  <Card key={hotel.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{hotel.name}</CardTitle>
                      <CardDescription>{hotel.city}, {hotel.country}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{hotel.description}</p>
                      <p className="font-semibold">${hotel.price_per_night}/night</p>
                      {hotel.rating && (
                        <p className="text-sm text-yellow-600">Rating: {hotel.rating}/5</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
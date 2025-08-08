import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Search, MapPin, Calendar, Users, Star, Shield, Clock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export default function Home() {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (destination.trim()) {
      navigate(`/hotels?search=${encodeURIComponent(destination)}`);
    } else {
      navigate('/hotels');
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Verified Reviews",
      description: "Only guests who have stayed can review"
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "Handpicked hotels with genuine ratings"
    },
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Quick and secure reservation process"
    }
  ];

  const popularDestinations = [
    { name: "Delhi", image: "🕌", hotels: "800+ hotels" },
    { name: "Mumbai", image: "🌴", hotels: "900+ hotels" },
    { name: "Bangalore", image: "🌳", hotels: "700+ hotels" },
    { name: "Kolkata", image: "🌉", hotels: "600+ hotels" },
    { name: "Pune", image: "🏞️", hotels: "500+ hotels" },
    { name: "Hyderabad", image: "🏰", hotels: "650+ hotels" },
    { name: "Chennai", image: "🏖️", hotels: "550+ hotels" },
    { name: "Jaipur", image: "🎡", hotels: "400+ hotels" },
    { name: "Goa", image: "🏝️", hotels: "1000+ hotels" },
    { name: "Agra", image: "🕌", hotels: "350+ hotels" },
    { name: "Nagpur", image: "🌲", hotels: "300+ hotels" },
    { name: "Kochi", image: "🚢", hotels: "450+ hotels" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 animate-fade-in" style={{
        backgroundImage: `url('/src/components/layout/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Where Trust Meets Travel
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Discover authentic hotels with verified reviews from real guests. 
            Book with confidence on RealStay.
          </p>
          
          {/* Search Form */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex-1 relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Check-in - Check-out"
                    className="pl-10"
                    readOnly
                  />
                </div>
                <div className="flex-1 relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Guests"
                    className="pl-10"
                    readOnly
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="px-8">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RealStay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/hotels?search=${destination.name}`)}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{destination.image}</div>
                  <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-muted-foreground">{destination.hotels}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
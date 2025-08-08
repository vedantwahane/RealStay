import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface Experience {
  id: string;
  title: string;
  city: string;
  country: string;
  rating: number;
  price: number;
  image_url?: string;
}

const sample: Experience[] = [
  { id: '1', title: 'Old City Food Walk', city: 'Delhi', country: 'India', rating: 4.9, price: 899 },
  { id: '2', title: 'Gateway Sunrise Photo Tour', city: 'Mumbai', country: 'India', rating: 4.8, price: 1299 },
  { id: '3', title: 'Coffee Brewing Masterclass', city: 'Bengaluru', country: 'India', rating: 4.7, price: 999 },
  { id: '4', title: 'Backwaters Kayaking', city: 'Kochi', country: 'India', rating: 4.9, price: 1599 },
];

export default function Experiences() {
  const navigate = useNavigate();
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  useEffect(() => {
    document.title = 'Experiences — RealStay';
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Unforgettable Experiences</h1>
          <p className="text-muted-foreground mt-2">Book unique activities hosted by locals</p>
        </header>

        <section ref={ref} className={visible ? 'animate-enter' : 'opacity-0'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sample.map((exp) => (
              <Card key={exp.id} className="hover:shadow-lg transition-shadow hover-scale">
                <CardContent className="p-0">
                  <AspectRatio ratio={4/3} className="bg-muted overflow-hidden">
                    {exp.image_url ? (
                      <img src={exp.image_url} alt={`${exp.title} experience photo`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">🎈</div>
                    )}
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="font-semibold">{exp.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" /> {exp.city}, {exp.country}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{exp.rating}</span>
                      </div>
                      <div className="text-sm"><span className="font-semibold">₹{exp.price}</span> / guest</div>
                    </div>
                    <Button variant="secondary" className="w-full mt-4" onClick={() => navigate('/hotels')}>Explore stays nearby</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

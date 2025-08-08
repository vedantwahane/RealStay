import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const services = [
  { title: 'Photography', note: '1 available' },
  { title: 'Chefs', note: 'Coming soon' },
  { title: 'Prepared meals', note: 'Coming soon' },
  { title: 'Massage', note: 'Coming soon' },
  { title: 'Training', note: 'Coming soon' },
  { title: 'Make-up', note: 'Coming soon' },
  { title: 'Hair', note: 'Coming soon' },
  { title: 'Spa treatments', note: 'Coming soon' },
];

export default function Services() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  useEffect(() => { document.title = 'Services — RealStay'; }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Local Services</h1>
          <p className="text-muted-foreground mt-2">Enhance your trip with trusted providers</p>
        </header>

        <section ref={ref} className={visible ? 'animate-enter' : 'opacity-0'}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow hover-scale">
                <CardContent className="p-0">
                  <AspectRatio ratio={1} className="bg-muted flex items-center justify-center text-5xl">🛎️</AspectRatio>
                  <div className="p-4">
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-muted-foreground text-sm">{s.note}</p>
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

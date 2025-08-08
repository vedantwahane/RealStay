import { Card, CardContent } from '@/components/ui/card';
import { Shield, Star, Globe, Users, Award, Clock } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Verified Reviews Only",
      description: "Every review is from a guest who actually stayed at the hotel, ensuring authentic feedback."
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "We personally vet every hotel partner to maintain the highest standards of service."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Discover amazing accommodations in destinations worldwide, from bustling cities to hidden gems."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform is built around authentic traveler experiences and genuine recommendations."
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Trusted by millions of travelers and recognized for our commitment to transparency."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our dedicated team is available around the clock to assist with your booking needs."
    }
  ];

  const stats = [
    { number: "1M+", label: "Verified Reviews" },
    { number: "50K+", label: "Partner Hotels" },
    { number: "180+", label: "Countries" },
    { number: "5M+", label: "Happy Travelers" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 text-white"
        style={{
          backgroundImage: `url('/src/components/layout/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About RealStay
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            We're revolutionizing travel by ensuring every hotel review comes from verified guests, 
            creating a trustworthy platform for authentic travel experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At RealStay, we believe that travel decisions should be based on authentic experiences 
                from real travelers. Our mission is to eliminate fake reviews and provide a platform 
                where every piece of feedback comes from verified hotel guests.
              </p>
              <p className="text-lg text-muted-foreground">
                We're committed to creating transparency in the travel industry, helping both travelers 
                make informed decisions and hotels showcase their genuine quality through authentic reviews.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-8">
              <div className="text-6xl mb-4 text-center">🛡️</div>
              <h3 className="text-xl font-semibold text-center mb-4">Trust & Transparency</h3>
              <p className="text-center text-muted-foreground">
                Every review on our platform is verified, ensuring you get honest insights 
                from fellow travelers who have actually experienced the hotels firsthand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RealStay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2024 by passionate travelers who were frustrated with unreliable hotel reviews, 
              RealStay was born from a simple idea: what if every review was guaranteed to be authentic?
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We developed a unique verification system that ensures only guests who have actually stayed 
              at a hotel can leave a review. This revolutionary approach has transformed how travelers 
              research and book accommodations worldwide.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to be the most trusted platform for hotel reviews, helping millions 
              of travelers make confident booking decisions based on genuine experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
              <p className="text-muted-foreground">
                We ensure every review is genuine and from verified guests, maintaining the integrity 
                of our platform.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Trust</h3>
              <p className="text-muted-foreground">
                Building lasting relationships with both travelers and hotel partners through 
                transparency and reliability.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                Continuously improving our platform to provide the best possible experience 
                for our users.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
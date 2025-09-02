import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Users, MapPin, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow animate-glow">
              <span className="text-2xl font-bold text-primary-foreground">E</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 animate-fade-in">
            Eventure
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
            Discover amazing events, workshops, and competitions happening at your college.
            Connect with communities, register for events, and never miss out on opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Button asChild size="lg" className="gap-2">
              <Link to="/signup">
                <Sparkles className="h-5 w-5" />
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/events">Browse Events</Link>
            </Button>
          </div>
          
          <div className="flex justify-center gap-8 text-sm text-muted-foreground animate-fade-in">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>50+ Events</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>1000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>10+ Colleges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center card-elevated">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
            <p className="text-muted-foreground">Browse workshops, competitions, and cultural events</p>
          </Card>
          
          <Card className="p-6 text-center card-elevated">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connect & Register</h3>
            <p className="text-muted-foreground">Join events and connect with like-minded students</p>
          </Card>
          
          <Card className="p-6 text-center card-elevated">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-College Support</h3>
            <p className="text-muted-foreground">Events from colleges across Kerala</p>
          </Card>
        </div>
      </section>
      
      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Ready to get started?</h2>
        <p className="text-muted-foreground mb-8">Join thousands of students discovering amazing events</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/signup">Create Account</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

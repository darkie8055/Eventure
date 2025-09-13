import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Sparkles, 
  Star,
  Trophy,
  MessageCircle,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl -z-10" />
        
        <div className="text-center max-w-6xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm animate-fade-in">
            🎉 Join 1000+ Students Across Kerala
          </Badge>
          
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur-xl opacity-50 animate-pulse" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow animate-glow">
                <span className="text-3xl font-bold text-primary-foreground">E</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold gradient-text mb-8 animate-fade-in leading-tight">
            Eventure
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-4xl mx-auto animate-slide-up leading-relaxed">
            Your gateway to <span className="text-primary font-semibold">amazing college events</span>, workshops, 
            and competitions. Connect with communities, discover opportunities, and never miss out.
          </p>
          
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-3xl mx-auto animate-slide-up">
            Built for students, by students. Join communities, register for events, and be part of something bigger.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Button asChild size="lg" className="gap-3 px-8 py-6 text-lg font-semibold">
              <Link to="/signup">
                <Sparkles className="h-6 w-6" />
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8 py-6 text-lg">
              <Link to="/events">
                <Calendar className="h-5 w-5 mr-2" />
                Browse Events
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">50+</span>
              </div>
              <p className="text-sm text-muted-foreground">Active Events</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">1000+</span>
              </div>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">10+</span>
              </div>
              <p className="text-sm text-muted-foreground">Colleges</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">25+</span>
              </div>
              <p className="text-sm text-muted-foreground">Communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to connect students with amazing opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-8 text-center card-elevated group hover:scale-105 transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Discover Events</h3>
            <p className="text-muted-foreground leading-relaxed">
              Browse workshops, hackathons, cultural events, and competitions happening across colleges in Kerala
            </p>
          </Card>
          
          <Card className="p-8 text-center card-elevated group hover:scale-105 transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Join Communities</h3>
            <p className="text-muted-foreground leading-relaxed">
              Connect with like-minded students, join college communities, and participate in group discussions
            </p>
          </Card>
          
          <Card className="p-8 text-center card-elevated group hover:scale-105 transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Community Chat</h3>
            <p className="text-muted-foreground leading-relaxed">
              Real-time messaging with community members, event discussions, and networking opportunities
            </p>
          </Card>
          
          <Card className="p-8 text-center card-elevated group hover:scale-105 transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Leaderboards</h3>
            <p className="text-muted-foreground leading-relaxed">
              Track community rankings, see top performers, and compete with other college communities
            </p>
          </Card>
          
          <Card className="p-8 text-center card-elevated group hover:scale-105 transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Quick Registration</h3>
            <p className="text-muted-foreground leading-relaxed">
              One-click event registration, bookmark favorites, and get notified about new opportunities
            </p>
          </Card>
          
          <Card className="p-8 text-center card-elevated group hover:scale-105 transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Mobile Optimized</h3>
            <p className="text-muted-foreground leading-relaxed">
              Perfect mobile experience with responsive design for on-the-go event discovery and management
            </p>
          </Card>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">For Students</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Never Miss an <span className="gradient-text">Opportunity</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stay connected with your college community and discover events that match your interests and career goals.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Smart Event Discovery</h4>
                  <p className="text-muted-foreground">AI-powered recommendations based on your interests</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Instant Notifications</h4>
                  <p className="text-muted-foreground">Get notified about new events and registration deadlines</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Easy Registration</h4>
                  <p className="text-muted-foreground">One-click registration and automatic calendar integration</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Badge variant="secondary" className="mb-4">For Community Leads</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Manage Events <span className="gradient-text">Effortlessly</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Powerful tools to create, manage, and promote events while tracking engagement and building community.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Advanced Analytics</h4>
                  <p className="text-muted-foreground">Track registrations, engagement, and community growth</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Community Building</h4>
                  <p className="text-muted-foreground">Built-in chat, leaderboards, and engagement tools</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Multi-Platform Sharing</h4>
                  <p className="text-muted-foreground">Share events across social media and college networks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Loved by Students
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what students and community leads are saying about Eventure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 card-elevated">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4 italic">
              "Eventure completely changed how I discover events at college. I never miss important workshops now!"
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">AK</span>
              </div>
              <div>
                <p className="font-semibold">Arya Krishna</p>
                <p className="text-sm text-muted-foreground">CS Student, GECI</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 card-elevated">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4 italic">
              "As a community lead, Eventure's analytics help me understand what events students want most."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">RN</span>
              </div>
              <div>
                <p className="font-semibold">Rahul Nair</p>
                <p className="text-sm text-muted-foreground">IEEE Lead, CET</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 card-elevated">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4 italic">
              "The community chat feature is amazing! I've made so many connections through Eventure."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">SP</span>
              </div>
              <div>
                <p className="font-semibold">Sneha Pillai</p>
                <p className="text-sm text-muted-foreground">ECE Student, FISAT</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-16">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join thousands of students discovering amazing events and building connections that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="gap-3 px-8 py-6 text-lg font-semibold">
              <Link to="/signup">
                <Users className="h-6 w-6" />
                Create Free Account
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8 py-6 text-lg">
              <Link to="/login">
                <Shield className="h-5 w-5 mr-2" />
                Sign In
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Free forever • No credit card required • Join in 30 seconds
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow">
                  <span className="text-lg font-bold text-primary-foreground">E</span>
                </div>
                <span className="text-xl font-bold gradient-text">Eventure</span>
              </div>
              <p className="text-muted-foreground">
                Connecting college students with amazing events and opportunities across Kerala.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <div className="space-y-2">
                <Link to="/events" className="block text-muted-foreground hover:text-primary transition-colors">Browse Events</Link>
                <Link to="/communities" className="block text-muted-foreground hover:text-primary transition-colors">Join Communities</Link>
                <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Leads</h4>
              <div className="space-y-2">
                <Link to="/create-event" className="block text-muted-foreground hover:text-primary transition-colors">Create Event</Link>
                <Link to="/community-dashboard" className="block text-muted-foreground hover:text-primary transition-colors">Community Dashboard</Link>
                <Link to="/signup" className="block text-muted-foreground hover:text-primary transition-colors">Become a Lead</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Eventure. Made with ❤️ for college students in Kerala.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
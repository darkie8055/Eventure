import Link from 'next/link';
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl -z-10" />
        
        <div className="text-center max-w-6xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Join the Academy Community
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent mb-8 leading-tight">
            Eventure
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with your academic community, discover exciting events, and build meaningful relationships with fellow students and faculty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full">
              <Link href="/signup">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
              <Link href="/events">
                Explore Events
              </Link>
            </Button>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Events Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Communities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Eventure?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're more than just an event platform - we're your gateway to an enriched academic experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Event Discovery</h3>
              <p className="text-muted-foreground mb-6">
                Find events tailored to your interests, academic goals, and schedule with our intelligent recommendation system.
              </p>
              <ul className="text-left space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Personalized recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Calendar integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">RSVP management</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-8 text-center bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community Building</h3>
              <p className="text-muted-foreground mb-6">
                Connect with like-minded peers, join study groups, and build lasting relationships within your academic community.
              </p>
              <ul className="text-left space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Interest-based groups</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Real-time messaging</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Mentorship programs</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-8 text-center bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Achievement Tracking</h3>
              <p className="text-muted-foreground mb-6">
                Track your involvement, earn badges, and showcase your academic and social achievements.
              </p>
              <ul className="text-left space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Digital portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Skill recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Leadership opportunities</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Events Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Trending Events</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't miss out on these popular upcoming events in your academic community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  <Calendar className="w-3 h-3 mr-1" />
                  Tomorrow
                </Badge>
                <h3 className="text-xl font-bold mb-2">Tech Innovation Workshop</h3>
                <p className="text-muted-foreground mb-4">
                  Learn about the latest trends in AI and machine learning from industry experts.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Tech Hub
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    45 attending
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  <Calendar className="w-3 h-3 mr-1" />
                  This Weekend
                </Badge>
                <h3 className="text-xl font-bold mb-2">Student Mixer Night</h3>
                <p className="text-muted-foreground mb-4">
                  Network with students from different departments and make new connections.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Student Center
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    120 attending
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  <Calendar className="w-3 h-3 mr-1" />
                  Next Week
                </Badge>
                <h3 className="text-xl font-bold mb-2">Career Fair 2024</h3>
                <p className="text-muted-foreground mb-4">
                  Meet with top employers and explore internship and job opportunities.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Main Auditorium
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    300+ attending
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/events">
                View All Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Students Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from your fellow students about their Eventure experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 bg-background/80 backdrop-blur-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Eventure transformed my college experience. I've made so many meaningful connections and discovered events I never would have known about."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">SA</span>
                </div>
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">Computer Science, Junior</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-background/80 backdrop-blur-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The community features are incredible. I found my study group through Eventure and we've been supporting each other ever since."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">MJ</span>
                </div>
                <div>
                  <div className="font-semibold">Marcus Johnson</div>
                  <div className="text-sm text-muted-foreground">Business Administration, Senior</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-background/80 backdrop-blur-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "As an international student, Eventure helped me integrate into campus life quickly. The event recommendations are spot on!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">AP</span>
                </div>
                <div>
                  <div className="font-semibold">Aria Patel</div>
                  <div className="text-sm text-muted-foreground">Engineering, Sophomore</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Eventure provides all the tools you need for a thriving academic social life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Chat</h3>
              <p className="text-sm text-muted-foreground">
                Connect instantly with event organizers and attendees
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Never miss important updates or event reminders
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-sm text-muted-foreground">
                Your data and privacy are protected with enterprise-grade security
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Mobile First</h3>
              <p className="text-sm text-muted-foreground">
                Access everything on-the-go with our responsive design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <br />
            <span className="text-primary">Academic Experience?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already making the most of their college life with Eventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full">
              <Link href="/signup">
                Join Eventure Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
              <Link href="/login">
                Already have an account?
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Eventure</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Connecting students, building communities, creating memories.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/events" className="hover:text-foreground transition-colors">Browse Events</Link></li>
                <li><Link href="/communities" className="hover:text-foreground transition-colors">Communities</Link></li>
                <li><Link href="/create-event" className="hover:text-foreground transition-colors">Create Event</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Eventure. All rights reserved. Built with ❤️ for students, by students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
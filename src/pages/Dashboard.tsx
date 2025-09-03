import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Clock, 
  MapPin,
  Plus,
  Star,
  MessageCircle,
  Share2
} from 'lucide-react';
import { EventCard } from '@/components/EventCard';

// Mock user data - replace with actual auth
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex@student.college.edu',
  role: 'student' as const,
  avatar: '/placeholder.svg',
  college: 'Government Engineering College',
  department: 'Computer Science',
  year: '3rd Year'
};

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'AI/ML Workshop',
    description: 'Learn the fundamentals of artificial intelligence and machine learning',
    date: '2024-01-15',
    time: '10:00 AM',
    location: 'Seminar Hall A',
    image: '/placeholder.svg',
    tags: ['Workshop', 'AI/ML', 'Technology'],
    registrations: 150,
    registeredCount: 150,
    community: 'IEEE Student Branch',
    organizer: { name: 'IEEE Student Branch', community: 'IEEE Student Branch' },
    isRegistered: true,
    isBookmarked: false
  },
  {
    id: '2',
    title: 'Hackathon 2024',
    description: '48-hour coding marathon to solve real-world problems',
    date: '2024-01-20',
    time: '9:00 AM',
    location: 'Computer Lab',
    image: '/placeholder.svg',
    tags: ['Hackathon', 'Coding', 'Competition'],
    registrations: 89,
    registeredCount: 89,
    community: 'Coding Club',
    organizer: { name: 'Coding Club', community: 'Coding Club' },
    isRegistered: false,
    isBookmarked: true
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Welcome back, {mockUser.name}!
            </h1>
            <p className="text-muted-foreground">
              {mockUser.department} • {mockUser.year} • {mockUser.college}
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Badge variant="secondary" className="text-sm">
              {(mockUser.role as string) === 'community_lead' ? 'Community Lead' : 'Student'}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Events Registered
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-success">+2 this month</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Communities Joined
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">5</div>
              <p className="text-xs text-success">Active member</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Achievements
              </CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-success">+1 this week</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bookmarks
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">15</div>
              <p className="text-xs text-muted-foreground">Saved events</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="registered">Registered</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Upcoming Events */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Events you're registered for happening soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.filter(event => event.isRegistered).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.date} • {event.time} • {event.location}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{event.community}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your recent interactions and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-success"></div>
                    <span className="text-sm text-foreground">Registered for AI/ML Workshop</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-foreground">Bookmarked Hackathon 2024</span>
                    <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-warning"></div>
                    <span className="text-sm text-foreground">Joined IEEE Student Branch</span>
                    <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registered" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Registered Events</h2>
              <Badge variant="secondary">2 events</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockEvents.filter(event => event.isRegistered).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Bookmarked Events</h2>
              <Badge variant="secondary">1 event</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockEvents.filter(event => event.isBookmarked).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communities" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">My Communities</h2>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Join Community
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'IEEE Student Branch', type: 'Technical', members: 250, events: 12, rank: 2 },
                { name: 'Coding Club', type: 'Technical', members: 180, events: 8, rank: 5 },
                { name: 'Cultural Committee', type: 'Cultural', members: 320, events: 15, rank: 1 }
              ].map((community, index) => (
                <Card key={index} className="card-elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{community.name}</CardTitle>
                      <Badge variant="outline">{community.type}</Badge>
                    </div>
                    <CardDescription>
                      {community.members} members • {community.events} events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-warning" />
                        <span className="text-sm text-muted-foreground">
                          Rank #{community.rank}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
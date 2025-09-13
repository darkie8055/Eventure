"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit,
  Eye,
  BarChart3,
  MessageCircle,
  Star,
  Trophy,
  Target
} from 'lucide-react';

// Mock community lead data
const mockUser = {
  name: 'Sarah Wilson',
  email: 'sarah@ieee.college.edu',
  role: 'community_lead' as const,
  avatar: '/placeholder.svg',
  college: 'Government Engineering College',
  community: 'IEEE Student Branch'
};

// Mock events data for community lead
const mockEvents = [
  {
    id: '1',
    title: 'AI/ML Workshop',
    date: '2024-01-15',
    registrations: 150,
    status: 'upcoming',
    views: 320,
    engagement: 85
  },
  {
    id: '2',
    title: 'Tech Talk Series',
    date: '2024-01-10',
    registrations: 89,
    status: 'completed',
    views: 245,
    engagement: 72
  },
  {
    id: '3',
    title: 'Innovation Challenge',
    date: '2024-01-25',
    registrations: 234,
    status: 'upcoming',
    views: 567,
    engagement: 91
  }
];

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, name: 'IEEE Student Branch', registrations: 1250, events: 15, score: 98 },
  { rank: 2, name: 'Coding Club', registrations: 980, events: 12, score: 87 },
  { rank: 3, name: 'Cultural Committee', registrations: 856, events: 18, score: 82 },
  { rank: 4, name: 'NSS Unit', registrations: 745, events: 10, score: 76 },
  { rank: 5, name: 'Innovation Cell', registrations: 623, events: 8, score: 71 }
];

const CommunityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Community Dashboard
            </h1>
            <p className="text-muted-foreground">
              {mockUser.community} • {mockUser.college}
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
            <Avatar className="h-12 w-12">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-xs text-success">+3 this month</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Registrations
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,250</div>
              <p className="text-xs text-success">+89 this week</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Leaderboard Rank
              </CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">#1</div>
              <p className="text-xs text-success">Top community</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Engagement Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">89%</div>
              <p className="text-xs text-success">+5% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Events Performance */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Recent Events Performance
                </CardTitle>
                <CardDescription>
                  Track how your latest events are performing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                          <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{event.registrations} registrations</span>
                          <span>{event.views} views</span>
                          <span>{event.engagement}% engagement</span>
                        </div>
                        <Progress value={event.engagement} className="mt-2 h-2" />
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Goals */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Monthly Goals
                </CardTitle>
                <CardDescription>
                  Track your community's progress this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Events Created</span>
                      <span className="text-sm text-muted-foreground">3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Registrations</span>
                      <span className="text-sm text-muted-foreground">89/100</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Engagement Rate</span>
                      <span className="text-sm text-muted-foreground">89/85%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">My Events</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Event
              </Button>
            </div>

            <div className="grid gap-4">
              {mockEvents.map((event) => (
                <Card key={event.id} className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                          <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">Date: {event.date}</p>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{event.registrations} registered</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-primary" />
                            <span>{event.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <span>{event.engagement}% engagement</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Analytics Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>Weekly registration growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-end justify-between gap-2">
                    {[20, 35, 45, 30, 55, 70, 89].map((value, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-primary to-primary-glow rounded-t"
                        style={{ height: `${value}%`, width: '100%' }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Week 1</span>
                    <span>Week 7</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Event Categories</CardTitle>
                  <CardDescription>Distribution of event types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Workshops</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Competitions</span>
                      <span className="text-sm text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Seminars</span>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Community Leaderboard</h2>
              <Badge variant="secondary">Updated live</Badge>
            </div>

            <Card className="card-elevated">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockLeaderboard.map((community) => (
                    <div key={community.rank} className="flex items-center justify-between p-6 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          community.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                          community.rank === 2 ? 'bg-gray-500/20 text-gray-400' :
                          community.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {community.rank === 1 && <Trophy className="h-4 w-4" />}
                          {community.rank !== 1 && <span className="font-bold">#{community.rank}</span>}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{community.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {community.events} events • {community.registrations} registrations
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{community.score}</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityDashboard;

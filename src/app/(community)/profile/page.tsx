"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Award,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

// Mock user data for community lead
const mockUser = {
  name: 'Sarah Wilson',
  email: 'sarah.wilson@college.edu',
  role: 'community_lead' as const,
  avatar: '/placeholder.svg'
};

// Mock community lead data
const mockCommunityLead = {
  id: '1',
  name: 'Sarah Wilson',
  email: 'sarah.wilson@college.edu',
  phone: '+1 (555) 123-4567',
  college: 'Government Engineering College',
  department: 'Computer Science & Engineering',
  community: {
    name: 'IEEE Student Branch',
    type: 'Technical',
    description: 'Advancing technology for humanity through professional development and technical innovation.',
    established: '2020',
    members: 250,
    website: 'https://ieee.college.edu',
    social: {
      instagram: '@ieee_college',
      twitter: '@ieee_college',
      linkedin: 'ieee-college-branch'
    }
  },
  position: 'Community Lead',
  tenure: 'Jan 2024 - Present',
  eventsOrganized: 24,
  totalParticipants: 1250,
  upcomingEvents: 5,
  achievements: [
    { title: 'Best Technical Community 2024', date: 'Dec 2024' },
    { title: 'Innovation Excellence Award', date: 'Sep 2024' },
    { title: 'Outstanding Leadership', date: 'Jun 2024' }
  ]
};

export default function CommunityLeadProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Community Lead Profile</h1>
          <p className="text-muted-foreground">
            Manage your community profile and track your leadership impact
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mockCommunityLead.name} alt={mockCommunityLead.name} />
                      <AvatarFallback className="text-xl">
                        {mockCommunityLead.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{mockCommunityLead.name}</h3>
                      <p className="text-muted-foreground">{mockCommunityLead.position}</p>
                      <Badge variant="secondary" className="mt-1">
                        {mockCommunityLead.community.type}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockCommunityLead.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockCommunityLead.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockCommunityLead.college}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockCommunityLead.department}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Info */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Community Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary">{mockCommunityLead.community.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {mockCommunityLead.community.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Established</p>
                    <p className="text-sm text-muted-foreground">{mockCommunityLead.community.established}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Members</p>
                    <p className="text-sm text-muted-foreground">{mockCommunityLead.community.members}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Social Links</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Statistics */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{mockCommunityLead.eventsOrganized}</p>
                          <p className="text-sm text-muted-foreground">Events Organized</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{mockCommunityLead.totalParticipants}</p>
                          <p className="text-sm text-muted-foreground">Total Participants</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                          <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{mockCommunityLead.upcomingEvents}</p>
                          <p className="text-sm text-muted-foreground">Upcoming Events</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Created "AI/ML Workshop Series"</p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                        <Badge variant="secondary">New Event</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                          <Users className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">15 new registrations for Tech Talk</p>
                          <p className="text-sm text-muted-foreground">5 hours ago</p>
                        </div>
                        <Badge variant="secondary">Registrations</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Managed Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Event management interface will be implemented here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Community Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Analytics dashboard will be implemented here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Achievements & Awards</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockCommunityLead.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                          <Award className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
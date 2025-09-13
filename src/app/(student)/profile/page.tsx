"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EventCard } from '@/components/events/EventCard';
import { 
  Calendar, 
  Users, 
  BookmarkIcon, 
  Settings,
  Edit3,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Trophy,
  Star,
  Clock,
  Save,
  Camera,
  Shield,
  Bell,
  Eye,
  EyeOff,
  User
} from 'lucide-react';

// Mock user data - this would come from authentication context
const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@geci.ac.in',
  phone: '+91 9876543210',
  role: 'student' as const,
  avatar: '/placeholder.svg',
  college: 'Government Engineering College Idukki',
  department: 'Computer Science & Engineering',
  year: '3rd Year',
  bio: 'Passionate about technology and innovation. Love participating in hackathons and tech events.',
  location: 'Painavu, Idukki',
  interests: ['Machine Learning', 'Web Development', 'UI/UX Design', 'Open Source'],
  socialLinks: {
    github: 'https://github.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    portfolio: 'https://alexjohnson.dev'
  },
  stats: {
    eventsAttended: 25,
    communitiesJoined: 5,
    bookmarkedEvents: 12,
    completionRate: 85
  },
  achievements: [
    { id: '1', title: 'Event Explorer', description: 'Attended 10+ events', icon: '🎯', earned: true },
    { id: '2', title: 'Community Builder', description: 'Joined 5+ communities', icon: '👥', earned: true },
    { id: '3', title: 'Tech Enthusiast', description: 'Attended 5+ tech events', icon: '💻', earned: true },
    { id: '4', title: 'Cultural Ambassador', description: 'Attended 3+ cultural events', icon: '🎭', earned: false },
    { id: '5', title: 'Super Participant', description: 'Attended 50+ events', icon: '⭐', earned: false }
  ]
};

// Mock registered events
const mockRegisteredEvents = [
  {
    id: '1',
    title: 'AI/ML Workshop',
    description: 'Learn the fundamentals of Artificial Intelligence and Machine Learning',
    date: '2024-01-15',
    time: '10:00 AM',
    location: 'Main Auditorium',
    poster: '/placeholder.svg',
    organizer: 'IEEE Student Branch',
    tags: ['Technical', 'AI/ML', 'Workshop'],
    registrationCount: 150,
    maxCapacity: 200,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Cultural Fest 2024',
    description: 'Annual cultural festival celebrating art, music, and dance',
    date: '2024-01-20',
    time: '6:00 PM',
    location: 'Open Grounds',
    poster: '/placeholder.svg',
    organizer: 'Cultural Committee',
    tags: ['Cultural', 'Music', 'Dance'],
    registrationCount: 300,
    maxCapacity: 500,
    status: 'upcoming'
  }
];

// Mock bookmarked events
const mockBookmarkedEvents = [
  {
    id: '3',
    title: 'Hackathon 2024',
    description: '48-hour coding challenge to build innovative solutions',
    date: '2024-02-01',
    time: '9:00 AM',
    location: 'Computer Lab',
    poster: '/placeholder.svg',
    organizer: 'Coding Club',
    tags: ['Technical', 'Hackathon', 'Coding'],
    registrationCount: 80,
    maxCapacity: 100,
    status: 'upcoming'
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);

  const handleSaveProfile = () => {
    // Here you would save the profile data
    console.log('Saving profile:', editedUser);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold gradient-text">{mockUser.name}</h1>
                      <p className="text-muted-foreground">{mockUser.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{mockUser.role === 'student' ? 'Student' : 'Community Lead'}</Badge>
                        <Badge variant="outline">{mockUser.year}</Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                      className="gap-2"
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit3 className="h-4 w-4" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUser.stats.eventsAttended}</div>
                      <div className="text-sm text-muted-foreground">Events Attended</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUser.stats.communitiesJoined}</div>
                      <div className="text-sm text-muted-foreground">Communities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUser.stats.bookmarkedEvents}</div>
                      <div className="text-sm text-muted-foreground">Bookmarks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockUser.stats.completionRate}%</div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editedUser.bio}
                          onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                          placeholder="Tell us about yourself..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editedUser.location}
                          onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editedUser.phone}
                          onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{mockUser.college}</p>
                          <p className="text-sm text-muted-foreground">{mockUser.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{mockUser.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{mockUser.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{mockUser.phone}</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Bio:</p>
                        <p className="text-sm">{mockUser.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Interests & Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Overview */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Registered for <strong>AI/ML Workshop</strong></p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Joined <strong>IEEE Student Branch</strong> community</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Bookmarked <strong>Hackathon 2024</strong></p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Registered Events</CardTitle>
                <CardDescription>
                  Events you have registered for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {mockRegisteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Bookmarked Events</CardTitle>
                <CardDescription>
                  Events you have saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {mockBookmarkedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Your accomplishments and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockUser.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-primary/5 border-primary/20' 
                          : 'bg-muted/30 border-border/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          {achievement.earned && (
                            <Badge variant="default" className="mt-2">Earned</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Event Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get notified about new events</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Registration Updates</h4>
                      <p className="text-sm text-muted-foreground">Updates about your registered events</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Community Updates</h4>
                      <p className="text-sm text-muted-foreground">News from your joined communities</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-muted-foreground">Who can see your profile</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Public
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Event History</h4>
                      <p className="text-sm text-muted-foreground">Show your event participation</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Visible
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

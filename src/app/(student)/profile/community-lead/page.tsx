"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Settings,
  Edit3,
  MapPin,
  Mail,
  Phone,
  Building,
  Trophy,
  Star,
  Clock,
  Save,
  Camera,
  Shield,
  Bell,
  Eye,
  EyeOff,
  User,
  CheckCircle,
  XCircle,
  PlusCircle,
  BarChart3,
  Target,
  Award,
  UserCheck
} from 'lucide-react';

interface CommunityStats {
  totalEvents: number;
  totalAttendees: number;
  totalMembers: number;
  avgRating: number;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  communityScore: number;
}

interface CommunityLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  college: string;
  avatar?: string;
  bio: string;
  joinedDate: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  communityName: string;
  communityDescription: string;
  communityCategory: string;
  socialMedia: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    icon: string;
  }>;
}

export default function CommunityLeadProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - replace with real data from your backend
  const [communityLead, setCommunityLead] = useState<CommunityLead>({
    id: "cl_001",
    name: "Sarah Johnson",
    email: "sarah.johnson@college.edu",
    phone: "+1 (555) 123-4567",
    position: "President",
    department: "Computer Science",
    college: "MIT",
    avatar: "/placeholder.svg",
    bio: "Passionate about bringing together students interested in technology and innovation. Leading the Tech Community with a focus on organizing hackathons, workshops, and networking events.",
    joinedDate: "2023-01-15",
    verificationStatus: "verified",
    communityName: "Tech Innovation Hub",
    communityDescription: "A community dedicated to fostering innovation and technological advancement among students.",
    communityCategory: "Technology",
    socialMedia: {
      website: "https://techhub.college.edu",
      instagram: "@techhub_college",
      linkedin: "tech-innovation-hub",
      twitter: "@TechHubCollege"
    },
    achievements: [
      {
        id: "1",
        title: "Community Builder",
        description: "Successfully grew community to 500+ members",
        date: "2024-01-15",
        icon: "users"
      },
      {
        id: "2", 
        title: "Event Organizer",
        description: "Organized 25+ successful events",
        date: "2024-02-20",
        icon: "calendar"
      },
      {
        id: "3",
        title: "Excellence Award",
        description: "Received Outstanding Community Leadership Award",
        date: "2024-03-10",
        icon: "trophy"
      }
    ]
  });

  const [stats] = useState<CommunityStats>({
    totalEvents: 28,
    totalAttendees: 1240,
    totalMembers: 567,
    avgRating: 4.8,
    verificationStatus: "verified",
    communityScore: 95
  });

  const [recentEvents] = useState([
    {
      id: "1",
      title: "Annual Tech Symposium 2024",
      date: "2024-03-15",
      attendees: 250,
      status: "completed",
      rating: 4.9
    },
    {
      id: "2",
      title: "AI Workshop Series",
      date: "2024-02-28",
      attendees: 80,
      status: "completed",
      rating: 4.7
    },
    {
      id: "3",
      title: "Spring Hackathon",
      date: "2024-04-20",
      attendees: 150,
      status: "upcoming",
      rating: null
    }
  ]);

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={communityLead.avatar} alt={communityLead.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    {communityLead.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {!isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {communityLead.name}
                      </h1>
                      <Badge className={`${getVerificationColor(communityLead.verificationStatus)} border-0`}>
                        {getVerificationIcon(communityLead.verificationStatus)}
                        {communityLead.verificationStatus.charAt(0).toUpperCase() + communityLead.verificationStatus.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-lg text-gray-600 mb-1">{communityLead.position} • {communityLead.communityName}</p>
                    <p className="text-gray-500">{communityLead.department} • {communityLead.college}</p>
                  </div>
                  
                  <Button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                {/* Community Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Total Events</p>
                        <p className="text-2xl font-bold">{stats.totalEvents}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Community Members</p>
                        <p className="text-2xl font-bold">{stats.totalMembers}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Total Attendees</p>
                        <p className="text-2xl font-bold">{stats.totalAttendees}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Avg Rating</p>
                        <p className="text-2xl font-bold">{stats.avgRating}</p>
                      </div>
                      <Star className="h-8 w-8 text-orange-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Community
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={communityLead.name}
                            onChange={(e) => setCommunityLead({...communityLead, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            value={communityLead.position}
                            onChange={(e) => setCommunityLead({...communityLead, position: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={communityLead.email}
                            onChange={(e) => setCommunityLead({...communityLead, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={communityLead.phone || ''}
                            onChange={(e) => setCommunityLead({...communityLead, phone: e.target.value})}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={communityLead.bio}
                            onChange={(e) => setCommunityLead({...communityLead, bio: e.target.value})}
                            rows={3}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <span>{communityLead.email}</span>
                        </div>
                        {communityLead.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <span>{communityLead.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-gray-400" />
                          <span>{communityLead.department} • {communityLead.college}</span>
                        </div>
                        <div className="pt-2">
                          <p className="text-gray-600 leading-relaxed">{communityLead.bio}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Community Information */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Community Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="communityName">Community Name</Label>
                          <Input
                            id="communityName"
                            value={communityLead.communityName}
                            onChange={(e) => setCommunityLead({...communityLead, communityName: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="communityCategory">Category</Label>
                          <Select
                            value={communityLead.communityCategory}
                            onValueChange={(value) => setCommunityLead({...communityLead, communityCategory: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Arts">Arts</SelectItem>
                              <SelectItem value="Sports">Sports</SelectItem>
                              <SelectItem value="Academic">Academic</SelectItem>
                              <SelectItem value="Cultural">Cultural</SelectItem>
                              <SelectItem value="Social">Social</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="communityDescription">Description</Label>
                          <Textarea
                            id="communityDescription"
                            value={communityLead.communityDescription}
                            onChange={(e) => setCommunityLead({...communityLead, communityDescription: e.target.value})}
                            rows={3}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">{communityLead.communityName}</h3>
                          <Badge variant="secondary" className="mt-1">{communityLead.communityCategory}</Badge>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{communityLead.communityDescription}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Community Score */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Community Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{stats.communityScore}</div>
                      <div className="text-sm text-purple-100 mb-4">out of 100</div>
                      <Progress value={stats.communityScore} className="h-2 bg-white/20" />
                      <p className="text-sm text-purple-100 mt-2">
                        Based on event success, member engagement, and community growth
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-semibold">{new Date(communityLead.joinedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Events Created</span>
                      <span className="font-semibold">{stats.totalEvents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{stats.avgRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Verification Status</span>
                      <Badge className={getVerificationColor(stats.verificationStatus)}>
                        {stats.verificationStatus.charAt(0).toUpperCase() + stats.verificationStatus.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Organized Events
              </h2>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid gap-4">
              {recentEvents.map((event) => (
                <Card key={event.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendees} attendees
                          </div>
                          {event.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {event.rating}
                            </div>
                          )}
                        </div>
                        <Badge 
                          variant={event.status === 'completed' ? 'default' : 'secondary'}
                          className={event.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Member Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Members</span>
                      <span className="text-2xl font-bold">{stats.totalMembers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">This Month</span>
                      <span className="text-green-600 font-semibold">+45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Growth Rate</span>
                      <span className="text-green-600 font-semibold">+8.6%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Engagement Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avg. Event Attendance</span>
                      <span className="text-2xl font-bold">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Members</span>
                      <span className="text-green-600 font-semibold">423</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Community Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{stats.avgRating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-4">
              {communityLead.achievements.map((achievement) => (
                <Card key={achievement.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-lg">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                        <p className="text-gray-600 mb-2">{achievement.description}</p>
                        <p className="text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="event-notifications">Event Notifications</Label>
                      <p className="text-sm text-gray-500">Get notified about new event registrations</p>
                    </div>
                    <Switch id="event-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="member-notifications">Member Notifications</Label>
                      <p className="text-sm text-gray-500">Get notified when new members join</p>
                    </div>
                    <Switch id="member-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-digest">Weekly Email Digest</Label>
                      <p className="text-sm text-gray-500">Receive weekly community statistics</p>
                    </div>
                    <Switch id="email-digest" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-visibility">Public Profile</Label>
                      <p className="text-sm text-gray-500">Make your profile visible to all students</p>
                    </div>
                    <Switch id="profile-visibility" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="contact-visibility">Show Contact Info</Label>
                      <p className="text-sm text-gray-500">Allow students to see your contact information</p>
                    </div>
                    <Switch id="contact-visibility" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="event-history">Event History</Label>
                      <p className="text-sm text-gray-500">Show your event organization history</p>
                    </div>
                    <Switch id="event-history" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Social Media Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={communityLead.socialMedia.website || ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      placeholder="@username"
                      value={communityLead.socialMedia.instagram || ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="linkedin.com/in/username"
                      value={communityLead.socialMedia.linkedin || ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      placeholder="@username"
                      value={communityLead.socialMedia.twitter || ''}
                    />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Social Links
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

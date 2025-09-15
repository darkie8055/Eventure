"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Users, 
  Calendar, 
  MessageCircle, 
  Trophy,
  Filter,
  Star,
  TrendingUp,
  MapPin,
  Plus,
  Crown
} from 'lucide-react';

// Mock user data
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex@student.college.edu',
  role: 'student' as const,
  avatar: '/placeholder.svg'
};

// Mock communities data
const mockCommunities = [
  {
    id: '1',
    name: 'IEEE Student Branch',
    type: 'Technical',
    description: 'Advancing technology for humanity through innovation and excellence.',
    members: 250,
    events: 15,
    college: 'Government Engineering College',
    rank: 1,
    avatar: '/placeholder.svg',
    isJoined: true,
    recentActivity: '2 hours ago',
    lead: {
      name: 'Sarah Wilson',
      avatar: '/placeholder.svg'
    }
  },
  {
    id: '2',
    name: 'Coding Club',
    type: 'Technical',
    description: 'Learn, code, and create amazing projects together.',
    members: 180,
    events: 8,
    college: 'Government Engineering College',
    rank: 5,
    avatar: '/placeholder.svg',
    isJoined: true,
    recentActivity: '1 day ago',
    lead: {
      name: 'Mike Chen',
      avatar: '/placeholder.svg'
    }
  },
  {
    id: '3',
    name: 'Cultural Committee',
    type: 'Cultural',
    description: 'Celebrating diversity through arts, music, and cultural events.',
    members: 320,
    events: 18,
    college: 'Government Engineering College',
    rank: 2,
    avatar: '/placeholder.svg',
    isJoined: false,
    recentActivity: '3 hours ago',
    lead: {
      name: 'Priya Sharma',
      avatar: '/placeholder.svg'
    }
  },
  {
    id: '4',
    name: 'NSS Unit',
    type: 'Social',
    description: 'Not me, but you. Serving society through volunteer work.',
    members: 145,
    events: 10,
    college: 'Government Engineering College',
    rank: 4,
    avatar: '/placeholder.svg',
    isJoined: false,
    recentActivity: '5 hours ago',
    lead: {
      name: 'Rahul Kumar',
      avatar: '/placeholder.svg'
    }
  },
  {
    id: '5',
    name: 'Innovation Cell',
    type: 'Technical',
    description: 'Fostering innovation and entrepreneurship among students.',
    members: 98,
    events: 6,
    college: 'Government Engineering College',
    rank: 7,
    avatar: '/placeholder.svg',
    isJoined: false,
    recentActivity: '1 day ago',
    lead: {
      name: 'Anita Patel',
      avatar: '/placeholder.svg'
    }
  }
];

// Mock leaderboard data
const leaderboardData = mockCommunities
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 10);

const Communities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredCommunities = mockCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || community.type === selectedType;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'joined' && community.isJoined) ||
                      (activeTab === 'available' && !community.isJoined);
    
    return matchesSearch && matchesType && matchesTab;
  });

  const communityTypes = ['all', 'Technical', 'Cultural', 'Social', 'Sports'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Communities</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join vibrant communities, connect with like-minded students, and participate in amazing events.
            Build your network and enhance your college experience.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-md border border-input bg-background text-foreground"
            >
              {communityTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="all">All Communities</TabsTrigger>
            <TabsTrigger value="joined">Joined</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <Card key={community.id} className="card-elevated hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={community.avatar} alt={community.name} />
                          <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {community.name}
                            {community.rank <= 3 && (
                              <Crown className="h-4 w-4 text-yellow-500" />
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {community.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Rank #{community.rank}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-3">
                      {community.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{community.members} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{community.events} events</span>
                        </div>
                      </div>

                      {/* College */}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{community.college}</span>
                      </div>

                      {/* Community Lead */}
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={community.lead.avatar} alt={community.lead.name} />
                          <AvatarFallback className="text-xs">{community.lead.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          Led by {community.lead.name}
                        </span>
                      </div>

                      {/* Recent Activity */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Active {community.recentActivity}</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>Growing</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {community.isJoined ? (
                          <>
                            <Button asChild size="sm" variant="outline" className="flex-1 gap-1">
                              <Link href="/chat">
                                <MessageCircle className="h-4 w-4" />
                                Chat
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline">
                              <Star className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" className="flex-1 gap-1">
                              <Plus className="h-4 w-4" />
                              Join
                            </Button>
                            <Button size="sm" variant="outline">
                              <Star className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Leaderboard Section */}
        <Card className="card-elevated mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Community Leaderboard
            </CardTitle>
            <CardDescription>
              Top performing communities based on events and engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.slice(0, 5).map((community) => (
                <div key={community.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      community.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                      community.rank === 2 ? 'bg-gray-500/20 text-gray-400' :
                      community.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      #{community.rank}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={community.avatar} alt={community.name} />
                      <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{community.name}</div>
                      <div className="text-sm text-muted-foreground">{community.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-foreground">{community.members}</div>
                      <div className="text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{community.events}</div>
                      <div className="text-muted-foreground">Events</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Communities;

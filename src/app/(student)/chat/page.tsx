"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  MessageCircle, 
  Users, 
  Calendar,
  ArrowRight,
  Hash,
  Crown,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// Mock user data
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex@student.college.edu',
  role: 'student' as const,
  avatar: '/placeholder.svg'
};

// Mock joined communities data
const mockJoinedCommunities = [
  {
    id: '1',
    name: 'IEEE Student Branch',
    type: 'Technical',
    description: 'Advancing technology for humanity through innovation and excellence.',
    members: 250,
    onlineMembers: 45,
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'Hey everyone! Welcome to the IEEE Student Branch community chat.',
      timestamp: '2 minutes ago',
      author: 'Sarah Wilson'
    },
    unreadCount: 3,
    rank: 1
  },
  {
    id: '2',
    name: 'Coding Club',
    type: 'Technical',
    description: 'Learn, code, and create amazing projects together.',
    members: 180,
    onlineMembers: 32,
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'The new JavaScript workshop materials are now available!',
      timestamp: '1 hour ago',
      author: 'Mike Chen'
    },
    unreadCount: 1,
    rank: 5
  },
  {
    id: '3',
    name: 'Cultural Committee',
    type: 'Cultural',
    description: 'Celebrating diversity through art, music, and cultural events.',
    members: 320,
    onlineMembers: 58,
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'Diwali celebration planning meeting tomorrow at 4 PM!',
      timestamp: '3 hours ago',
      author: 'Priya Sharma'
    },
    unreadCount: 0,
    rank: 3
  },
  {
    id: '4',
    name: 'Photography Club',
    type: 'Creative',
    description: 'Capturing moments and creating memories through the lens.',
    members: 95,
    onlineMembers: 12,
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'Check out the amazing shots from last weekend\'s photo walk!',
      timestamp: '5 hours ago',
      author: 'David Kim'
    },
    unreadCount: 0,
    rank: 8
  },
  {
    id: '5',
    name: 'Entrepreneurship Cell',
    type: 'Business',
    description: 'Fostering innovation and startup culture among students.',
    members: 150,
    onlineMembers: 28,
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'Pitch competition registration closes tomorrow!',
      timestamp: '1 day ago',
      author: 'Rohan Patel'
    },
    unreadCount: 2,
    rank: 6
  }
];

export default function StudentChatPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommunities = mockJoinedCommunities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnreadMessages = mockJoinedCommunities.reduce((total, community) => total + community.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Community Chats
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with your communities, join discussions, and stay updated with the latest conversations.
          </p>
          {totalUnreadMessages > 0 && (
            <Badge variant="destructive" className="mt-2">
              {totalUnreadMessages} unread message{totalUnreadMessages !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{mockJoinedCommunities.length}</div>
                  <div className="text-sm text-muted-foreground">Joined Communities</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockJoinedCommunities.reduce((total, community) => total + community.onlineMembers, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Online Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{totalUnreadMessages}</div>
                  <div className="text-sm text-muted-foreground">Unread Messages</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communities List */}
        <div className="space-y-4">
          {filteredCommunities.length === 0 ? (
            <Card className="card-elevated">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No communities found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Join communities to start chatting!'}
                </p>
                <Button asChild>
                  <Link href="/communities">
                    Explore Communities
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredCommunities.map((community) => (
              <Card key={community.id} className="card-elevated hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Community Avatar and Basic Info */}
                      <div className="relative">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={community.avatar} alt={community.name} />
                          <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {community.onlineMembers > 0 && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-foreground truncate">
                            {community.name}
                          </h3>
                          {community.rank <= 3 && (
                            <Crown className="h-4 w-4 text-yellow-500" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {community.type}
                          </Badge>
                          {community.unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs">
                              {community.unreadCount}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 truncate">
                          {community.description}
                        </p>
                        
                        {/* Last Message */}
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-foreground">
                            {community.lastMessage.author}:
                          </span>
                          <span className="text-muted-foreground truncate flex-1">
                            {community.lastMessage.content}
                          </span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {community.lastMessage.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Community Stats and Action */}
                    <div className="flex items-center gap-6 ml-4">
                      <div className="text-center hidden md:block">
                        <div className="text-sm font-medium text-foreground">
                          {community.onlineMembers}
                        </div>
                        <div className="text-xs text-muted-foreground">online</div>
                      </div>
                      
                      <div className="text-center hidden md:block">
                        <div className="text-sm font-medium text-foreground">
                          {community.members}
                        </div>
                        <div className="text-xs text-muted-foreground">members</div>
                      </div>
                      
                      <Button asChild>
                        <Link href={`/chat/${community.id}`} className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          <span className="hidden sm:inline">Chat</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Empty State for No Joined Communities */}
        {mockJoinedCommunities.length === 0 && (
          <Card className="card-elevated">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Communities Joined Yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Join communities to start chatting with like-minded students and participate in discussions.
              </p>
              <Button asChild size="lg">
                <Link href="/communities" className="gap-2">
                  <Users className="h-4 w-4" />
                  Explore Communities
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

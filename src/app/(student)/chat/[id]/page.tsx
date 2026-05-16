"use client"

import { useState, useRef, useEffect, use } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Users, 
  Hash,
  Phone,
  Video,
  Settings,
  Star,
  Image as ImageIcon,
  File,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock user data
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex@student.college.edu',
  role: 'student' as const,
  avatar: '/placeholder.svg'
};

// Mock community data - this would come from the route parameter
const getCommunityData = (id: string) => {
  const communities = {
    '1': {
      id: '1',
      name: 'IEEE Student Branch',
      type: 'Technical',
      members: 250,
      onlineMembers: 45,
      avatar: '/placeholder.svg'
    },
    '2': {
      id: '2',
      name: 'Coding Club',
      type: 'Technical',
      members: 180,
      onlineMembers: 32,
      avatar: '/placeholder.svg'
    },
    '3': {
      id: '3',
      name: 'Cultural Committee',
      type: 'Cultural',
      members: 320,
      onlineMembers: 58,
      avatar: '/placeholder.svg'
    },
    '4': {
      id: '4',
      name: 'Photography Club',
      type: 'Creative',
      members: 95,
      onlineMembers: 12,
      avatar: '/placeholder.svg'
    },
    '5': {
      id: '5',
      name: 'Entrepreneurship Cell',
      type: 'Business',
      members: 150,
      onlineMembers: 28,
      avatar: '/placeholder.svg'
    }
  };
  return communities[id as keyof typeof communities] || communities['1'];
};

// Mock chat channels
const mockChannels = [
  { id: '1', name: 'general', description: 'General discussions', unread: 3, type: 'text' },
  { id: '2', name: 'events', description: 'Event announcements', unread: 0, type: 'text' },
  { id: '3', name: 'projects', description: 'Project collaborations', unread: 1, type: 'text' },
  { id: '4', name: 'resources', description: 'Study materials', unread: 0, type: 'text' },
  { id: '5', name: 'random', description: 'Off-topic discussions', unread: 0, type: 'text' }
];

// Mock messages
const mockMessages = [
  {
    id: '1',
    author: { name: 'Sarah Wilson', avatar: '/placeholder.svg', role: 'Community Lead' },
    content: "Hey everyone! Welcome to the IEEE Student Branch community chat. This is where we'll coordinate our activities and share updates.",
    timestamp: '10:30 AM',
    reactions: [{ emoji: '👋', count: 5 }, { emoji: '🔥', count: 2 }],
    isPinned: true
  },
  {
    id: '2',
    author: { name: 'Mike Chen', avatar: '/placeholder.svg', role: 'Student' },
    content: "Excited to be part of this community! Looking forward to the upcoming workshop.",
    timestamp: '10:32 AM',
    reactions: [{ emoji: '🎉', count: 3 }],
    isPinned: false
  },
  {
    id: '3',
    author: { name: 'Priya Sharma', avatar: '/placeholder.svg', role: 'Student' },
    content: "Can someone share the presentation slides from yesterday's session?",
    timestamp: '10:45 AM',
    reactions: [],
    isPinned: false
  },
  {
    id: '4',
    author: { name: 'Rahul Kumar', avatar: '/placeholder.svg', role: 'Student' },
    content: "Sure! I'll upload them in the #resources channel.",
    timestamp: '10:46 AM',
    reactions: [{ emoji: '👍', count: 4 }],
    isPinned: false
  }
];

// Mock online members
const mockOnlineMembers = [
  { id: '1', name: 'Sarah Wilson', avatar: '/placeholder.svg', role: 'Community Lead', status: 'online' },
  { id: '2', name: 'Mike Chen', avatar: '/placeholder.svg', role: 'Student', status: 'online' },
  { id: '3', name: 'Priya Sharma', avatar: '/placeholder.svg', role: 'Student', status: 'online' },
  { id: '4', name: 'Alex Johnson', avatar: '/placeholder.svg', role: 'Student', status: 'online' },
  { id: '5', name: 'Rahul Kumar', avatar: '/placeholder.svg', role: 'Student', status: 'away' }
];

export default function StudentCommunityChat({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [selectedChannel, setSelectedChannel] = useState(mockChannels[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const mockCommunity = getCommunityData(resolvedParams.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        author: { 
          name: mockUser.name, 
          avatar: mockUser.avatar, 
          role: 'Student' 
        },
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: [],
        isPinned: false
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-border bg-card">
          {/* Back to Chat List */}
          <div className="p-4 border-b border-border">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start gap-2">
              <Link href="/chat">
                <ArrowLeft className="h-4 w-4" />
                Back to Chats
              </Link>
            </Button>
          </div>

          {/* Community Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={mockCommunity.avatar} alt={mockCommunity.name} />
                <AvatarFallback>{mockCommunity.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{mockCommunity.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {mockCommunity.onlineMembers} online
                </p>
              </div>
              <Settings className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground" />
            </div>
          </div>

          {/* Channels */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Channels
              </h4>
              <div className="space-y-1">
                {mockChannels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      selectedChannel.id === channel.id
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    {channel.unread > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Online Members */}
            <div className="p-4 border-t border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Online — {mockOnlineMembers.length}
              </h4>
              <div className="space-y-2">
                {mockOnlineMembers.slice(0, 10).map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                        member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-foreground truncate">{member.name}</div>
                      {member.role === 'Community Lead' && (
                        <Badge variant="secondary" className="text-xs h-4">Lead</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <div>
                <h2 className="font-semibold text-foreground">{selectedChannel.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedChannel.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.isPinned ? 'bg-accent/30 p-3 rounded-lg' : ''}`}>
                  <Avatar className="h-8 w-8 mt-0.5">
                    <AvatarImage src={msg.author.avatar} alt={msg.author.name} />
                    <AvatarFallback className="text-xs">{msg.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground text-sm">{msg.author.name}</span>
                      {msg.author.role === 'Community Lead' && (
                        <Badge variant="secondary" className="text-xs h-4">Lead</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      {msg.isPinned && (
                        <Star className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{msg.content}</p>
                    {msg.reactions.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {msg.reactions.map((reaction, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs hover:bg-accent"
                          >
                            {reaction.emoji} {reaction.count}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <File className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    placeholder={`Message #${selectedChannel.name}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
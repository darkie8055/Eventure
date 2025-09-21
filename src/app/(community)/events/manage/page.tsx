"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Calendar, 
  MapPin,
  Clock,
  Search,
  Filter,
  Download,
  Share2
} from 'lucide-react';

// Mock user data
const mockUser = {
  name: 'Sarah Wilson',
  email: 'sarah.wilson@college.edu',
  role: 'community_lead' as const,
  avatar: '/placeholder.svg'
};

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'AI/ML Workshop Series',
    description: 'Learn the fundamentals of Machine Learning and AI development',
    date: '2025-01-15',
    time: '2:00 PM',
    location: 'Lab 101, CS Building',
    status: 'upcoming',
    registrations: 45,
    capacity: 50,
    type: 'workshop',
    category: 'technical',
    poster: '/placeholder.svg',
    createdAt: '2024-12-01',
    lastUpdated: '2024-12-05'
  },
  {
    id: '2',
    title: 'Tech Talk: Blockchain Revolution',
    description: 'Understanding blockchain technology and its applications',
    date: '2025-01-20',
    time: '3:30 PM',
    location: 'Main Auditorium',
    status: 'upcoming',
    registrations: 120,
    capacity: 150,
    type: 'seminar',
    category: 'technical',
    poster: '/placeholder.svg',
    createdAt: '2024-11-28',
    lastUpdated: '2024-12-02'
  },
  {
    id: '3',
    title: 'Annual Hackathon 2025',
    description: '48-hour coding marathon to build innovative solutions',
    date: '2025-01-10',
    time: '9:00 AM',
    location: 'Innovation Center',
    status: 'completed',
    registrations: 200,
    capacity: 200,
    type: 'hackathon',
    category: 'competition',
    poster: '/placeholder.svg',
    createdAt: '2024-11-15',
    lastUpdated: '2024-11-20'
  },
  {
    id: '4',
    title: 'Cultural Evening 2024',
    description: 'Showcase of student talents and cultural performances',
    date: '2024-12-15',
    time: '6:00 PM',
    location: 'Open Air Theater',
    status: 'completed',
    registrations: 300,
    capacity: 300,
    type: 'cultural',
    category: 'entertainment',
    poster: '/placeholder.svg',
    createdAt: '2024-11-01',
    lastUpdated: '2024-11-10'
  }
];

export default function ManageEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    // Implementation for deleting an event
    console.log('Delete event:', eventId);
  };

  const handleEditEvent = (eventId: string) => {
    // Implementation for editing an event
    console.log('Edit event:', eventId);
  };

  const handleViewEvent = (eventId: string) => {
    // Implementation for viewing event details
    console.log('View event:', eventId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Manage Events</h1>
            <p className="text-muted-foreground">
              View, edit, and manage all your community events
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Create New Event
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="card-elevated mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="draft">Draft</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Events ({mockEvents.length})</TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming ({mockEvents.filter(e => e.status === 'upcoming').length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({mockEvents.filter(e => e.status === 'completed').length})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Drafts ({mockEvents.filter(e => e.status === 'draft').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {filteredEvents.length === 0 ? (
              <Card className="card-elevated">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? 'Try adjusting your search terms' : 'Create your first event to get started'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="card-elevated hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold">{event.title}</h3>
                                <Badge className={getStatusColor(event.status)}>
                                  {event.status}
                                </Badge>
                                <Badge variant="outline">{event.type}</Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{event.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewEvent(event.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditEvent(event.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{event.registrations}/{event.capacity} registered</span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                              Created: {event.createdAt} • Last updated: {event.lastUpdated}
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-sm">
                                <span className="font-medium">Registration: </span>
                                <span className={event.registrations >= event.capacity ? 'text-red-600' : 'text-green-600'}>
                                  {((event.registrations / event.capacity) * 100).toFixed(0)}% filled
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
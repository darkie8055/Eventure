"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, Filter, Calendar, MapPin, Users } from 'lucide-react';

// Mock data for demonstration
const mockEvents = [
  {
    id: '1',
    title: 'React.js Workshop: Building Modern Web Applications',
    description: 'Learn the fundamentals of React.js and build your first modern web application with hands-on coding exercises.',
    date: '2024-01-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Computer Science Lab, GECI',
    poster: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop',
    registrationLink: 'https://forms.google.com/react-workshop',
    tags: ['Technical', 'Workshop', 'React', 'Web Development'],
    organizer: {
      name: 'Arjun Kumar',
      community: 'IEEE GECI Student Branch',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    registeredCount: 45,
    maxCapacity: 60,
    isBookmarked: false,
    isRegistered: false,
  },
  {
    id: '2',
    title: 'Annual Cultural Fest 2024',
    description: 'Join us for three days of music, dance, drama, and cultural performances by talented students from across Kerala.',
    date: '2024-01-20',
    time: '9:00 AM - 8:00 PM',
    location: 'Main Auditorium, GECI',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=300&fit=crop',
    tags: ['Cultural', 'Festival', 'Music', 'Dance'],
    organizer: {
      name: 'Priya Nair',
      community: 'Cultural Committee GECI',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    registeredCount: 234,
    maxCapacity: 500,
    isBookmarked: true,
    isRegistered: true,
  },
  {
    id: '3',
    title: 'AI/ML Bootcamp: From Basics to Implementation',
    description: 'Comprehensive 5-day bootcamp covering machine learning fundamentals, neural networks, and practical implementation.',
    date: '2024-01-25',
    time: '9:30 AM - 5:30 PM',
    location: 'IT Department Seminar Hall',
    poster: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop',
    tags: ['Technical', 'AI/ML', 'Bootcamp', 'Data Science'],
    organizer: {
      name: 'Dr. Rajesh Menon',
      community: 'CSI GECI Chapter',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    },
    registeredCount: 28,
    maxCapacity: 40,
    isBookmarked: false,
    isRegistered: false,
  },
  {
    id: '4',
    title: 'Startup Pitch Competition',
    description: 'Present your innovative startup ideas to a panel of industry experts and investors. Win prizes worth ₹50,000!',
    date: '2024-02-01',
    time: '2:00 PM - 6:00 PM',
    location: 'Innovation Hub, GECI',
    poster: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop',
    tags: ['Competition', 'Startup', 'Innovation', 'Entrepreneurship'],
    organizer: {
      name: 'Vikram Singh',
      community: 'Entrepreneurship Cell GECI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    registeredCount: 67,
    maxCapacity: 100,
    isBookmarked: false,
    isRegistered: false,
  },
];

const mockUser = {
  name: 'Ananya Krishnan',
  email: 'ananya@student.geci.ac.in',
  role: 'student' as const,
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
};

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [events, setEvents] = useState(mockEvents);

  const allTags = Array.from(
    new Set(mockEvents.flatMap(event => event.tags))
  );

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || event.tags.includes(selectedTag);
    const matchesDate = selectedDate === 'all' || 
                       (selectedDate === 'today' && new Date(event.date).toDateString() === new Date().toDateString()) ||
                       (selectedDate === 'week' && new Date(event.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesTag && matchesDate;
  });

  const handleBookmark = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isBookmarked: !event.isBookmarked }
        : event
    ));
  };

  const handleRegister = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isRegistered: true, registeredCount: event.registeredCount + 1 }
        : event
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Discover Events</h1>
          <p className="text-muted-foreground">
            Find amazing workshops, competitions, and cultural events happening at your college
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 card-elevated">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedTag !== 'all' || selectedDate !== 'all' || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {selectedTag !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedTag}
                  <button onClick={() => setSelectedTag('all')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {selectedDate !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedDate === 'today' ? 'Today' : selectedDate === 'week' ? 'This Week' : 'This Month'}
                  <button onClick={() => setSelectedDate('all')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 card-elevated">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredEvents.length}</p>
                <p className="text-sm text-muted-foreground">Events Found</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 card-elevated">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-foreground">{events.filter(e => e.isRegistered).length}</p>
                <p className="text-sm text-muted-foreground">Registered</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 card-elevated">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-foreground">{events.filter(e => e.isBookmarked).length}</p>
                <p className="text-sm text-muted-foreground">Bookmarked</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onBookmark={handleBookmark}
                onRegister={handleRegister}
                onShare={(eventId) => console.log('Share event:', eventId)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center card-elevated">
            <div className="max-w-md mx-auto">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new events.
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedTag('all');
                setSelectedDate('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}

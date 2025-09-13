"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookmarkIcon, Calendar, Tag, X } from 'lucide-react';

// Mock data
const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@college.edu',
  role: 'student' as const,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
};

const mockBookmarkedEvents = [
  {
    id: '1',
    title: 'AI Workshop: Building ChatBots',
    description: 'Learn to build intelligent chatbots using modern AI frameworks and natural language processing.',
    date: '2024-02-15',
    time: '2:00 PM - 5:00 PM',
    location: 'Tech Hub, Room 301',
    poster: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    registrationLink: 'https://forms.google.com/ai-workshop',
    tags: ['AI', 'Technology', 'Workshop'],
    organizer: {
      name: 'Tech Community',
      community: 'AI & ML Society',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'
    },
    registeredCount: 45,
    maxCapacity: 60,
    isBookmarked: true,
    isRegistered: false
  },
  {
    id: '2',
    title: 'Cultural Night 2024',
    description: 'Experience diverse cultures through music, dance, food, and performances from around the world.',
    date: '2024-02-20',
    time: '6:00 PM - 10:00 PM',
    location: 'Main Auditorium',
    poster: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop',
    tags: ['Cultural', 'Performance', 'Community'],
    organizer: {
      name: 'Cultural Society',
      community: 'International Students Club',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    registeredCount: 120,
    maxCapacity: 200,
    isBookmarked: true,
    isRegistered: true
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    description: 'Present your innovative startup ideas to industry experts and compete for funding opportunities.',
    date: '2024-02-25',
    time: '10:00 AM - 4:00 PM',
    location: 'Innovation Center',
    poster: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    tags: ['Entrepreneurship', 'Competition', 'Networking'],
    organizer: {
      name: 'Entrepreneurship Hub',
      community: 'Startup Incubator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    registeredCount: 35,
    maxCapacity: 50,
    isBookmarked: true,
    isRegistered: false
  }
];

export default function Bookmarks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [events, setEvents] = useState(mockBookmarkedEvents);

  // Get all unique tags
  const allTags = Array.from(new Set(events.flatMap(event => event.tags)));

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.community.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === 'all' || event.tags.includes(selectedTag);
    
    const matchesDate = selectedDate === 'all' || event.date === selectedDate;
    
    return matchesSearch && matchesTag && matchesDate;
  });

  const handleBookmark = (eventId: string) => {
    setEvents(prevEvents => 
      prevEvents.filter(event => event.id !== eventId)
    );
  };

  const handleRegister = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, isRegistered: true, registeredCount: event.registeredCount + 1 }
          : event
      )
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('all');
    setSelectedDate('all');
  };

  const registeredEventsCount = events.filter(event => event.isRegistered).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <BookmarkIcon className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">My Bookmarks</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Keep track of events you're interested in. Never miss out on the events that matter to you.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookmarked events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-full md:w-48">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-full md:w-48">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="All Dates" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="2024-02-15">Feb 15, 2024</SelectItem>
              <SelectItem value="2024-02-20">Feb 20, 2024</SelectItem>
              <SelectItem value="2024-02-25">Feb 25, 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedTag !== 'all' || selectedDate !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: "{searchQuery}"
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSearchQuery('')}
                />
              </Badge>
            )}
            {selectedTag && (
              <Badge variant="secondary" className="gap-1">
                Category: {selectedTag}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedTag('')}
                />
              </Badge>
            )}
            {selectedDate && (
              <Badge variant="secondary" className="gap-1">
                Date: {new Date(selectedDate).toLocaleDateString()}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedDate('')}
                />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-elevated p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">{events.length}</div>
            <div className="text-sm text-muted-foreground">Total Bookmarks</div>
          </div>
          <div className="card-elevated p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">{registeredEventsCount}</div>
            <div className="text-sm text-muted-foreground">Also Registered</div>
          </div>
          <div className="card-elevated p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">{filteredEvents.length}</div>
            <div className="text-sm text-muted-foreground">Showing Results</div>
          </div>
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-muted/30">
              <BookmarkIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">No bookmarks found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {events.length === 0 
                ? "You haven't bookmarked any events yet. Explore events and save the ones you're interested in!"
                : "No events match your current filters. Try adjusting your search criteria."
              }
            </p>
            {(searchQuery || selectedTag || selectedDate) && (
              <Button onClick={clearFilters} className="gap-2">
                <Filter className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

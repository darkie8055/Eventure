"use client"

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, Filter, Calendar, MapPin, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();

  // Fetch events from Firebase
  useEffect(() => {
    const eventsRef = collection(db, 'events');
    const eventsQuery = query(eventsRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const fetchedEvents: any[] = [];
      snapshot.forEach((doc) => {
        fetchedEvents.push({ id: doc.id, ...doc.data() });
      });
      setEvents(fetchedEvents);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching events:', error);
      setEvents([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const allTags = Array.from(
    new Set(events.flatMap(event => event.tags || []))
  );

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || (event.tags && event.tags.includes(selectedTag));
    const matchesDate = selectedDate === 'all' || 
                       (selectedDate === 'today' && new Date(event.date).toDateString() === new Date().toDateString()) ||
                       (selectedDate === 'week' && new Date(event.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesTag && matchesDate;
  });

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Discover Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find exciting events, workshops, and activities happening at your college. 
            Connect with your community and expand your horizons.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
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
                <SelectValue placeholder="Any Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Date</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(selectedTag !== 'all' || selectedDate !== 'all') && (
            <div className="flex gap-2 flex-wrap">
              {selectedTag !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedTag}
                  <button 
                    onClick={() => setSelectedTag('all')}
                    className="ml-1 hover:bg-muted-foreground rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedDate !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedDate === 'today' ? 'Today' : 'This Week'}
                  <button 
                    onClick={() => setSelectedDate('all')}
                    className="ml-1 hover:bg-muted-foreground rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredEvents.length === 0 ? 'No events found' : 
               `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''} found`}
            </h2>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-32 bg-muted rounded mb-4"></div>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Calendar className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || selectedTag !== 'all' || selectedDate !== 'all'
                  ? 'Try adjusting your search criteria or explore different categories.'
                  : 'No events are currently available. Check back later for new events!'}
              </p>
              {(searchQuery || selectedTag !== 'all' || selectedDate !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('all');
                    setSelectedDate('all');
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onBookmark={() => {
                  // Handle bookmark functionality
                  console.log('Bookmark event:', event.id);
                }}
                onRegister={() => {
                  // Handle registration functionality
                  console.log('Register for event:', event.id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
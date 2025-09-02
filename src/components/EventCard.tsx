import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  MapPin, 
  Users, 
  BookmarkIcon, 
  Share2, 
  ExternalLink,
  Clock,
  Bookmark
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  poster?: string;
  registrationLink?: string;
  tags: string[];
  organizer: {
    name: string;
    community: string;
    avatar?: string;
  };
  registeredCount: number;
  maxCapacity?: number;
  isBookmarked?: boolean;
  isRegistered?: boolean;
}

interface EventCardProps {
  event: Event;
  onBookmark?: (eventId: string) => void;
  onRegister?: (eventId: string) => void;
  onShare?: (eventId: string) => void;
}

export function EventCard({ event, onBookmark, onRegister, onShare }: EventCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(event.isBookmarked || false);
  const [isRegistered, setIsRegistered] = useState(event.isRegistered || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(event.id);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Event removed from your bookmarks" : "Event saved to your bookmarks",
    });
  };

  const handleRegister = () => {
    if (event.registrationLink) {
      window.open(event.registrationLink, '_blank');
    } else {
      setIsRegistered(true);
      onRegister?.(event.id);
      toast({
        title: "Registration successful!",
        description: "You have been registered for this event.",
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/event/${event.id}`);
    onShare?.(event.id);
    toast({
      title: "Link copied!",
      description: "Event link has been copied to clipboard.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="card-elevated overflow-hidden group hover:scale-[1.02] transition-all duration-300 animate-fade-in">
      {/* Event Poster */}
      {event.poster && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.poster} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          
          {/* Quick Actions Overlay */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 glass"
              onClick={handleBookmark}
            >
              {isBookmarked ? (
                <Bookmark className="h-4 w-4 fill-current text-primary" />
              ) : (
                <BookmarkIcon className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 glass"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Event Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
              {event.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {event.description}
            </p>
          </div>
        </div>

        {/* Event Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <span>
              {event.registeredCount} registered
              {event.maxCapacity && ` / ${event.maxCapacity} max`}
            </span>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-muted/30">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
              <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{event.organizer.name}</p>
              <p className="text-xs text-muted-foreground">{event.organizer.community}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {isRegistered ? (
            <Button disabled className="flex-1 gap-2">
              <Users className="h-4 w-4" />
              Registered
            </Button>
          ) : (
            <Button onClick={handleRegister} className="flex-1 gap-2">
              {event.registrationLink ? (
                <>
                  <ExternalLink className="h-4 w-4" />
                  Register
                </>
              ) : (
                <>
                  <Users className="h-4 w-4" />
                  Register
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
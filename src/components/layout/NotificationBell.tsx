"use client"

import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Notification {
  id: string;
  type: 'event' | 'comment' | 'announcement' | 'verification';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'event',
    title: 'New Event: Tech Talk on AI',
    message: 'IEEE Student Branch is hosting a tech talk on AI this Friday',
    timestamp: '2 hours ago',
    read: false,
    avatar: '/placeholder.svg',
    actionUrl: '/events/1'
  },
  {
    id: '2',
    type: 'comment',
    title: 'Comment on your event',
    message: 'Sarah Wilson commented on "React Workshop"',
    timestamp: '5 hours ago',
    read: false,
    avatar: '/placeholder.svg',
    actionUrl: '/events/2'
  },
  {
    id: '3',
    type: 'verification',
    title: 'Community Verification Update',
    message: 'Your community verification request is under review',
    timestamp: '1 day ago',
    read: true,
    actionUrl: '/verification'
  },
  {
    id: '4',
    type: 'announcement',
    title: 'Platform Update',
    message: 'New features have been added to Eventure!',
    timestamp: '2 days ago',
    read: true
  }
];

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event': return '📅';
      case 'comment': return '💬';
      case 'verification': return '✅';
      case 'announcement': return '📢';
      default: return '🔔';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Notification Panel */}
          <Card className="absolute right-0 top-full mt-2 w-80 max-h-96 z-20 shadow-lg border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs h-7 px-2"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-7 w-7 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="max-h-80">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-border hover:bg-accent/50 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-accent/20' : ''
                        }`}
                        onClick={() => {
                          markAsRead(notification.id);
                          if (notification.actionUrl) {
                            // In a real app, you'd use router.push here
                            console.log('Navigate to:', notification.actionUrl);
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {notification.avatar ? (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback>
                                {notification.title.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground truncate">
                                {notification.title}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              {notifications.length > 0 && (
                <div className="p-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      setIsOpen(false);
                      // In a real app, navigate to notifications page
                      console.log('Navigate to notifications page');
                    }}
                  >
                    View All Notifications
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Users,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  Star,
  Clock,
  MapPin,
  Heart,
  MessageSquare,
  Eye,
  UserCheck,
  Building,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy,
  where,
  getDocs,
  Timestamp
} from "firebase/firestore";

interface AnalyticsData {
  userStats: {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    studentUsers: number;
    communityLeads: number;
    adminUsers: number;
  };
  communityStats: {
    totalCommunities: number;
    activeCommunities: number;
    verifiedCommunities: number;
    newCommunitiesThisMonth: number;
    totalMembers: number;
    averageMembersPerCommunity: number;
  };
  eventStats: {
    totalEvents: number;
    upcomingEvents: number;
    completedEvents: number;
    cancelledEvents: number;
    totalAttendees: number;
    averageAttendeesPerEvent: number;
  };
  engagementStats: {
    totalBookmarks: number;
    totalLikes: number;
    totalComments: number;
    averageEventRating: number;
    mostPopularCategory: string;
    mostActiveHour: string;
  };
}

interface RecentActivity {
  id: string;
  type: "user_signup" | "community_created" | "event_created" | "verification_request";
  description: string;
  timestamp: string;
  user?: string;
  status?: string;
}

interface PopularEvent {
  id: string;
  title: string;
  organizer: string;
  attendees: number;
  likes: number;
  category: string;
  date: string;
}

interface TopCommunity {
  id: string;
  name: string;
  leader: string;
  members: number;
  events: number;
  category: string;
  isVerified: boolean;
}

export default function ReportsAnalyticsPage() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    userStats: {
      totalUsers: 0,
      activeUsers: 0,
      newUsersThisMonth: 0,
      studentUsers: 0,
      communityLeads: 0,
      adminUsers: 0,
    },
    communityStats: {
      totalCommunities: 0,
      activeCommunities: 0,
      verifiedCommunities: 0,
      newCommunitiesThisMonth: 0,
      totalMembers: 0,
      averageMembersPerCommunity: 0,
    },
    eventStats: {
      totalEvents: 0,
      upcomingEvents: 0,
      completedEvents: 0,
      cancelledEvents: 0,
      totalAttendees: 0,
      averageAttendeesPerEvent: 0,
    },
    engagementStats: {
      totalBookmarks: 0,
      totalLikes: 0,
      totalComments: 0,
      averageEventRating: 4.2,
      mostPopularCategory: "Academic",
      mostActiveHour: "2:00 PM",
    },
  });
  
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [popularEvents, setPopularEvents] = useState<PopularEvent[]>([]);
  const [topCommunities, setTopCommunities] = useState<TopCommunity[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Load analytics data
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setLoading(true);

        // Calculate date filters
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

        let dateQuery = null;
        switch (dateFilter) {
          case "week":
            dateQuery = where("createdAt", ">=", Timestamp.fromDate(startOfWeek));
            break;
          case "month":
            dateQuery = where("createdAt", ">=", Timestamp.fromDate(startOfMonth));
            break;
          default:
            dateQuery = null;
        }

        // Load Users Data
        const usersRef = collection(db, "users");
        const usersQuery = dateQuery ? query(usersRef, dateQuery) : query(usersRef);
        const usersSnapshot = await getDocs(usersQuery);
        
        let userStats = {
          totalUsers: 0,
          activeUsers: 0,
          newUsersThisMonth: 0,
          studentUsers: 0,
          communityLeads: 0,
          adminUsers: 0,
        };

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          userStats.totalUsers++;
          
          if (userData.role === "student") userStats.studentUsers++;
          else if (userData.role === "community_lead") userStats.communityLeads++;
          else if (userData.role === "admin") userStats.adminUsers++;
          
          if (userData.lastLogin && new Date(userData.lastLogin.toDate()) > startOfWeek) {
            userStats.activeUsers++;
          }
          
          if (userData.createdAt && new Date(userData.createdAt.toDate()) > startOfMonth) {
            userStats.newUsersThisMonth++;
          }
        });

        // Load Communities Data
        const communitiesRef = collection(db, "communities");
        const communitiesQuery = dateFilter === "all" ? query(communitiesRef) : query(communitiesRef, dateQuery);
        const communitiesSnapshot = await getDocs(communitiesQuery);
        
        let communityStats = {
          totalCommunities: 0,
          activeCommunities: 0,
          verifiedCommunities: 0,
          newCommunitiesThisMonth: 0,
          totalMembers: 0,
          averageMembersPerCommunity: 0,
        };

        let topCommunitiesData: TopCommunity[] = [];

        communitiesSnapshot.forEach((doc) => {
          const communityData = doc.data();
          communityStats.totalCommunities++;
          
          if (communityData.status === "active") communityStats.activeCommunities++;
          if (communityData.isVerified) communityStats.verifiedCommunities++;
          
          const memberCount = communityData.memberCount || 0;
          communityStats.totalMembers += memberCount;
          
          if (communityData.createdAt && new Date(communityData.createdAt.toDate()) > startOfMonth) {
            communityStats.newCommunitiesThisMonth++;
          }

          // Collect top communities data
          topCommunitiesData.push({
            id: doc.id,
            name: communityData.name || "Unnamed Community",
            leader: communityData.leaderName || "Unknown",
            members: memberCount,
            events: communityData.events || 0,
            category: communityData.category || "Other",
            isVerified: communityData.isVerified || false,
          });
        });

        communityStats.averageMembersPerCommunity = communityStats.totalCommunities > 0 
          ? Math.round(communityStats.totalMembers / communityStats.totalCommunities) 
          : 0;

        // Sort and get top 5 communities
        topCommunitiesData.sort((a, b) => b.members - a.members);
        setTopCommunities(topCommunitiesData.slice(0, 5));

        // Load Events Data (if events collection exists)
        let eventStats = {
          totalEvents: 0,
          upcomingEvents: 0,
          completedEvents: 0,
          cancelledEvents: 0,
          totalAttendees: 0,
          averageAttendeesPerEvent: 0,
        };

        try {
          const eventsRef = collection(db, "events");
          const eventsQuery = dateFilter === "all" ? query(eventsRef) : query(eventsRef, dateQuery);
          const eventsSnapshot = await getDocs(eventsQuery);
          
          let popularEventsData: PopularEvent[] = [];

          eventsSnapshot.forEach((doc) => {
            const eventData = doc.data();
            eventStats.totalEvents++;
            
            const attendeesCount = eventData.attendees?.length || 0;
            eventStats.totalAttendees += attendeesCount;
            
            const eventDate = new Date(eventData.date?.toDate?.() || eventData.date);
            const now = new Date();
            
            if (eventDate > now) {
              eventStats.upcomingEvents++;
            } else {
              eventStats.completedEvents++;
            }
            
            if (eventData.status === "cancelled") {
              eventStats.cancelledEvents++;
            }

            // Collect popular events data
            popularEventsData.push({
              id: doc.id,
              title: eventData.title || "Untitled Event",
              organizer: eventData.organizerName || "Unknown",
              attendees: attendeesCount,
              likes: eventData.likes?.length || 0,
              category: eventData.category || "Other",
              date: eventDate.toLocaleDateString(),
            });
          });

          eventStats.averageAttendeesPerEvent = eventStats.totalEvents > 0 
            ? Math.round(eventStats.totalAttendees / eventStats.totalEvents) 
            : 0;

          // Sort and get top 5 events
          popularEventsData.sort((a, b) => (b.attendees + b.likes) - (a.attendees + a.likes));
          setPopularEvents(popularEventsData.slice(0, 5));
        } catch (error) {
          console.log("Events collection not found or accessible");
        }

        // Generate recent activities (mock data for now)
        const activities: RecentActivity[] = [
          {
            id: "1",
            type: "user_signup",
            description: "New student registered",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            user: "John Doe",
          },
          {
            id: "2",
            type: "community_created",
            description: "Tech Club community created",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            user: "Jane Smith",
          },
          {
            id: "3",
            type: "verification_request",
            description: "Verification request submitted",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
            user: "Mike Johnson",
            status: "pending",
          },
        ];
        setRecentActivities(activities);

        setAnalyticsData(prev => ({
          ...prev,
          userStats,
          communityStats,
          eventStats,
        }));

      } catch (error) {
        console.error("Error loading analytics data:", error);
        toast({
          title: "Error",
          description: "Failed to load analytics data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, [dateFilter, toast]);

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Report export will be available for download shortly",
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_signup":
        return <Users className="w-4 h-4 text-blue-600" />;
      case "community_created":
        return <Building className="w-4 h-4 text-green-600" />;
      case "event_created":
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case "verification_request":
        return <UserCheck className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Academic": "bg-blue-100 text-blue-800",
      "Cultural": "bg-purple-100 text-purple-800",
      "Sports": "bg-orange-100 text-orange-800",
      "Technology": "bg-green-100 text-green-800",
      "Social": "bg-pink-100 text-pink-800",
      "Professional": "bg-indigo-100 text-indigo-800",
    };
    
    return (
      <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {category}
      </Badge>
    );
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">
                  Reports & Analytics
                </h1>
                <p className="text-muted-foreground">
                  Monitor platform performance and user engagement
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={handleExportReport} className="gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="communities">Communities</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Users</p>
                          <p className="text-2xl font-bold">{analyticsData.userStats.totalUsers}</p>
                          <p className="text-xs text-green-600">+{analyticsData.userStats.newUsersThisMonth} this month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Building className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Communities</p>
                          <p className="text-2xl font-bold">{analyticsData.communityStats.totalCommunities}</p>
                          <p className="text-xs text-green-600">+{analyticsData.communityStats.newCommunitiesThisMonth} this month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Events</p>
                          <p className="text-2xl font-bold">{analyticsData.eventStats.totalEvents}</p>
                          <p className="text-xs text-blue-600">{analyticsData.eventStats.upcomingEvents} upcoming</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Users</p>
                          <p className="text-2xl font-bold">{analyticsData.userStats.activeUsers}</p>
                          <p className="text-xs text-muted-foreground">This week</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts and Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            {getActivityIcon(activity.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {activity.user && `by ${activity.user} • `}
                                {new Date(activity.timestamp).toLocaleString()}
                              </p>
                            </div>
                            {activity.status && (
                              <Badge variant="outline" className="text-xs">
                                {activity.status}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Communities */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Top Communities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topCommunities.map((community, index) => (
                          <div key={community.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">{community.name}</p>
                                {community.isVerified && (
                                  <UserCheck className="w-3 h-3 text-green-600" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {community.members} members • {community.events} events
                              </p>
                            </div>
                            {getCategoryBadge(community.category)}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Popular Events */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Popular Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {popularEvents.map((event) => (
                        <Card key={event.id} className="border border-gray-200">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-sm mb-2">{event.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">by {event.organizer}</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {event.attendees}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {event.likes}
                                </span>
                              </div>
                              {getCategoryBadge(event.category)}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Students</p>
                          <p className="text-2xl font-bold">{analyticsData.userStats.studentUsers}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <UserCheck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Community Leads</p>
                          <p className="text-2xl font-bold">{analyticsData.userStats.communityLeads}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Activity className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active This Week</p>
                          <p className="text-2xl font-bold">{analyticsData.userStats.activeUsers}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Communities Tab */}
              <TabsContent value="communities" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Communities</p>
                          <p className="text-2xl font-bold">{analyticsData.communityStats.activeCommunities}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <UserCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Verified</p>
                          <p className="text-2xl font-bold">{analyticsData.communityStats.verifiedCommunities}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Members</p>
                          <p className="text-2xl font-bold">{analyticsData.communityStats.averageMembersPerCommunity}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Upcoming</p>
                          <p className="text-2xl font-bold">{analyticsData.eventStats.upcomingEvents}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="text-2xl font-bold">{analyticsData.eventStats.completedEvents}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Attendees</p>
                          <p className="text-2xl font-bold">{analyticsData.eventStats.totalAttendees}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Attendees</p>
                          <p className="text-2xl font-bold">{analyticsData.eventStats.averageAttendeesPerEvent}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
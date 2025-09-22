"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
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
  Trophy,
  Filter,
  Star,
  TrendingUp,
  MapPin,
  Plus,
  Crown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Communities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();

  // Fetch communities from Firebase
  useEffect(() => {
    const communitiesRef = collection(db, 'communities');
    const communitiesQuery = query(communitiesRef, orderBy('name', 'asc'));

    const unsubscribe = onSnapshot(communitiesQuery, (snapshot) => {
      const fetchedCommunities: any[] = [];
      snapshot.forEach((doc) => {
        fetchedCommunities.push({ id: doc.id, ...doc.data() });
      });
      setCommunities(fetchedCommunities);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching communities:', error);
      setCommunities([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || community.type === selectedType;
    return matchesSearch && matchesType;
  });

  const communityTypes = Array.from(new Set(communities.map(c => c.type).filter(Boolean)));

  return (
    <ProtectedRoute allowedRoles={["student", "community_lead"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Join Communities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with like-minded students, participate in exciting events, and build lasting friendships 
            through our vibrant community network.
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="joined">Joined</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search communities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Types</option>
                {communityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <TabsContent value="all" className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="h-20 bg-muted rounded mb-4"></div>
                      <div className="h-3 bg-muted rounded w-full mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredCommunities.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Users className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No communities found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || selectedType !== 'all'
                      ? 'Try adjusting your search criteria.'
                      : 'No communities are currently available.'}
                  </p>
                  {(searchTerm || selectedType !== 'all') && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedType('all');
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map((community) => (
                  <Card key={community.id} className="card-elevated hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={community.avatar} alt={community.name} />
                            <AvatarFallback>{community.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{community.name}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {community.type}
                            </Badge>
                          </div>
                        </div>
                        {community.rank === 1 && (
                          <Crown className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <CardDescription className="text-sm line-clamp-2">
                        {community.description}
                      </CardDescription>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{community.members || 0} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{community.events || 0} events</span>
                        </div>
                      </div>

                      {community.college && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{community.college}</span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {community.isJoined ? (
                          <>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Star className="h-4 w-4 mr-1" />
                              Favorite
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="joined" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your joined communities will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Trending communities will be displayed here.</p>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Community leaderboard will be available soon.</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="card-elevated max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">
                Want to create your own community?
              </h3>
              <p className="text-muted-foreground mb-6">
                Start building your community today and connect with students who share your interests and passions.
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Community
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
"use client"

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  Calendar, 
  Users, 
  Settings,
  Edit3,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Save,
  Building,
  Globe,
  TrendingUp
} from 'lucide-react';

interface CommunityLeadProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: 'community_lead';
  avatar?: string;
  college: string;
  department: string;
  communityName: string;
  communityType: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
}

export default function CommunityLeadProfile() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<CommunityLeadProfile | null>(null);
  const [editForm, setEditForm] = useState({
    bio: '',
    location: '',
    phone: '',
    website: ''
  });

  // Fetch user data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as CommunityLeadProfile;
            setUser(userData);
            setEditForm({
              bio: userData.bio || '',
              location: userData.location || '',
              phone: userData.phone || '',
              website: userData.website || ''
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast({
            title: "Error",
            description: "Failed to load profile data.",
            variant: "destructive",
          });
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleSaveProfile = async () => {
    if (!user || !auth.currentUser) return;
    
    setIsLoading(true);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), editForm);
      setUser({ ...user, ...editForm });
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation user={{ name: 'Loading...', email: '', role: 'community_lead', avatar: '', community: '' }} />
        <div className="container max-w-6xl mx-auto py-8 px-4">
          <div className="text-center">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation user={{ name: 'Error', email: '', role: 'community_lead', avatar: '', community: '' }} />
        <div className="container max-w-6xl mx-auto py-8 px-4">
          <div className="text-center">Failed to load profile data.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} />
      
      <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Profile Header */}
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h1 className="text-3xl font-bold gradient-text">{user.name}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex gap-2 mt-2 justify-center">
                    <Badge variant="secondary">Community Lead</Badge>
                    <Badge variant="outline">{user.communityType}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveProfile} disabled={isLoading}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* College Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{user.college}</p>
                        <p className="text-sm text-muted-foreground">{user.department}</p>
                      </div>
                    </div>
                  </div>

                  {/* Community Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{user.communityName}</p>
                        <p className="text-sm text-muted-foreground">{user.communityType} Community</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          placeholder="Enter location"
                          value={editForm.location}
                          onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        />
                      ) : (
                        <span>{user.location || 'Location not set'}</span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          placeholder="Enter phone number"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        />
                      ) : (
                        <span>{user.phone || 'Phone not set'}</span>
                      )}
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          placeholder="Enter website URL"
                          value={editForm.website}
                          onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                        />
                      ) : (
                        <span>{user.website || 'Website not set'}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="space-y-2">
                  <Label>Bio</Label>
                  {isEditing ? (
                    <Textarea
                      placeholder="Tell us about your community..."
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm">{user.bio || 'No bio available'}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Events Created</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Total Participants</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">0%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">1</div>
              <div className="text-sm text-muted-foreground">Community</div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Created Events</CardTitle>
                <CardDescription>Events you have organized</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No events created yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Analytics</CardTitle>
                <CardDescription>Performance metrics for your events</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics will appear once you create events.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive notifications about events</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Community Settings</p>
                      <p className="text-xs text-muted-foreground">Manage community preferences</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
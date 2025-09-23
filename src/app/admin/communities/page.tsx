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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  Calendar,
  Building,
  UserCheck,
  Star,
  Eye,
  Settings,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy,
  where,
  addDoc,
  serverTimestamp,
  getDocs
} from "firebase/firestore";

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  leaderId: string;
  leaderName: string;
  leaderEmail: string;
  memberCount: number;
  maxMembers?: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  lastActivity?: string;
  events?: number;
  department?: string;
  facultyAdvisor?: string;
  socialMedia?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  status: "active" | "inactive" | "suspended" | "pending";
}

interface CommunityStats {
  totalCommunities: number;
  activeCommunities: number;
  totalMembers: number;
  verifiedCommunities: number;
  pendingCommunities: number;
  suspendedCommunities: number;
  averageMembers: number;
}

export default function CommunitiesManagementPage() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [stats, setStats] = useState<CommunityStats>({
    totalCommunities: 0,
    activeCommunities: 0,
    totalMembers: 0,
    verifiedCommunities: 0,
    pendingCommunities: 0,
    suspendedCommunities: 0,
    averageMembers: 0
  });

  // Load communities
  useEffect(() => {
    const communitiesRef = collection(db, "communities");
    const q = query(communitiesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const communitiesData: Community[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        communitiesData.push({
          id: doc.id,
          status: data.status || "active",
          memberCount: data.memberCount || 0,
          events: data.events || 0,
          isActive: data.isActive !== false,
          isVerified: data.isVerified || false,
          ...data,
        } as Community);
      });
      setCommunities(communitiesData);
      
      // Calculate stats
      const totalMembers = communitiesData.reduce((sum, c) => sum + c.memberCount, 0);
      const newStats: CommunityStats = {
        totalCommunities: communitiesData.length,
        activeCommunities: communitiesData.filter(c => c.status === "active").length,
        totalMembers,
        verifiedCommunities: communitiesData.filter(c => c.isVerified).length,
        pendingCommunities: communitiesData.filter(c => c.status === "pending").length,
        suspendedCommunities: communitiesData.filter(c => c.status === "suspended").length,
        averageMembers: communitiesData.length ? Math.round(totalMembers / communitiesData.length) : 0
      };
      setStats(newStats);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching communities:", error);
      toast({
        title: "Error",
        description: "Failed to load communities",
        variant: "destructive",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  // Filter communities
  useEffect(() => {
    let filtered = communities;

    if (searchTerm) {
      filtered = filtered.filter(community =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(community => community.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(community => community.status === statusFilter);
    }

    setFilteredCommunities(filtered);
  }, [communities, searchTerm, categoryFilter, statusFilter]);

  const handleViewCommunity = (community: Community) => {
    setSelectedCommunity(community);
    setIsViewDialogOpen(true);
  };

  const handleUpdateCommunityStatus = async (communityId: string, status: Community["status"]) => {
    try {
      const communityRef = doc(db, "communities", communityId);
      await updateDoc(communityRef, {
        status,
        [`${status}At`]: serverTimestamp(),
        [`${status}By`]: userProfile?.email || "admin"
      });

      toast({
        title: "Community Updated",
        description: `Community status changed to ${status}`,
      });
    } catch (error) {
      console.error("Error updating community:", error);
      toast({
        title: "Error",
        description: "Failed to update community status",
        variant: "destructive",
      });
    }
  };

  const handleVerifyCommunity = async (communityId: string, communityName: string) => {
    try {
      const communityRef = doc(db, "communities", communityId);
      await updateDoc(communityRef, {
        isVerified: true,
        verifiedAt: serverTimestamp(),
        verifiedBy: userProfile?.email || "admin"
      });

      toast({
        title: "Community Verified",
        description: `${communityName} has been verified`,
      });
    } catch (error) {
      console.error("Error verifying community:", error);
      toast({
        title: "Error",
        description: "Failed to verify community",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCommunity = async (communityId: string, communityName: string) => {
    try {
      await deleteDoc(doc(db, "communities", communityId));

      toast({
        title: "Community Deleted",
        description: `${communityName} has been permanently deleted`,
      });
    } catch (error) {
      console.error("Error deleting community:", error);
      toast({
        title: "Error",
        description: "Failed to delete community",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      "academic": "bg-blue-100 text-blue-800",
      "cultural": "bg-purple-100 text-purple-800",
      "sports": "bg-orange-100 text-orange-800",
      "technology": "bg-green-100 text-green-800",
      "social": "bg-pink-100 text-pink-800",
      "professional": "bg-indigo-100 text-indigo-800",
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
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Communities Management
            </h1>
            <p className="text-muted-foreground">
              Manage all communities, their status, and monitor activity
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Communities</p>
                    <p className="text-2xl font-bold">{stats.totalCommunities}</p>
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
                    <p className="text-sm text-muted-foreground">Active Communities</p>
                    <p className="text-2xl font-bold">{stats.activeCommunities}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                    <p className="text-2xl font-bold">{stats.totalMembers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Shield className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Verified</p>
                    <p className="text-2xl font-bold">{stats.verifiedCommunities}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 card-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">Search communities</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search communities by name, leader, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communities List */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Communities ({filteredCommunities.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredCommunities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No communities found matching your criteria.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCommunities.map((community) => (
                    <Card key={community.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Users className="w-6 h-6 text-primary" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{community.name}</h3>
                                {getStatusBadge(community.status)}
                                {getCategoryBadge(community.category)}
                                {community.isVerified && (
                                  <UserCheck className="w-4 h-4 text-green-600" />
                                )}
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {community.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Shield className="w-3 h-3" />
                                  <span>{community.leaderName}</span>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>{community.memberCount} members</span>
                                </div>
                                
                                {community.department && (
                                  <div className="flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    <span>{community.department}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Created {new Date(community.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewCommunity(community)}
                              className="gap-2"
                            >
                              <Eye className="w-3 h-3" />
                              View
                            </Button>

                            {!community.isVerified && community.status === "active" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVerifyCommunity(community.id, community.name)}
                                className="gap-2 text-green-600 hover:text-green-700"
                              >
                                <UserCheck className="w-3 h-3" />
                                Verify
                              </Button>
                            )}

                            {community.status === "active" ? (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="gap-2 text-orange-600 hover:text-orange-700">
                                    <AlertTriangle className="w-3 h-3" />
                                    Suspend
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Suspend Community</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to suspend {community.name}? The community will be hidden from users until reactivated.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleUpdateCommunityStatus(community.id, "suspended")}
                                      className="bg-orange-600 hover:bg-orange-700"
                                    >
                                      Suspend
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            ) : community.status === "suspended" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateCommunityStatus(community.id, "active")}
                                className="gap-2 text-green-600 hover:text-green-700"
                              >
                                <Activity className="w-3 h-3" />
                                Activate
                              </Button>
                            ) : null}

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                                  <Trash2 className="w-3 h-3" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Community</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {community.name}? This action cannot be undone and will permanently remove all community data, events, and member information.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteCommunity(community.id, community.name)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* View Community Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedCommunity?.name}
                {selectedCommunity?.isVerified && (
                  <UserCheck className="w-5 h-5 text-green-600" />
                )}
              </DialogTitle>
              <DialogDescription>
                Community details and information
              </DialogDescription>
            </DialogHeader>
            
            {selectedCommunity && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedCommunity.status)}</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                    <div className="mt-1">{getCategoryBadge(selectedCommunity.category)}</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Members</Label>
                    <p className="mt-1 font-medium">{selectedCommunity.memberCount}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Created</Label>
                    <p className="mt-1 font-medium">{new Date(selectedCommunity.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="mt-1">{selectedCommunity.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Community Leader</Label>
                    <p className="mt-1 font-medium">{selectedCommunity.leaderName}</p>
                    <p className="text-sm text-muted-foreground">{selectedCommunity.leaderEmail}</p>
                  </div>
                  
                  {selectedCommunity.department && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                      <p className="mt-1 font-medium">{selectedCommunity.department}</p>
                    </div>
                  )}
                </div>

                {selectedCommunity.facultyAdvisor && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Faculty Advisor</Label>
                    <p className="mt-1 font-medium">{selectedCommunity.facultyAdvisor}</p>
                  </div>
                )}

                {selectedCommunity.socialMedia && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Social Media</Label>
                    <div className="mt-1 space-y-1">
                      {selectedCommunity.socialMedia.website && (
                        <p className="text-sm">Website: {selectedCommunity.socialMedia.website}</p>
                      )}
                      {selectedCommunity.socialMedia.instagram && (
                        <p className="text-sm">Instagram: {selectedCommunity.socialMedia.instagram}</p>
                      )}
                      {selectedCommunity.socialMedia.twitter && (
                        <p className="text-sm">Twitter: {selectedCommunity.socialMedia.twitter}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  UserCheck,
  Settings,
  BarChart3,
  FileText,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  serverTimestamp,
  getDoc,
  writeBatch
} from "firebase/firestore";

interface VerificationRequest {
  id: string;
  communityName: string;
  leaderName: string;
  leaderEmail: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  department?: string;
  expectedMembers?: string;
  facultyAdvisor?: string;
  [key: string]: any; // For additional fields
}

export default function AdminDashboardPage() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  // Real-time listener for verification requests
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      const q = query(
        collection(db, "verification_requests"),
        orderBy("submittedAt", "desc")
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const requestsData: VerificationRequest[] = [];
        snapshot.forEach((doc) => {
          requestsData.push({
            id: doc.id,
            ...doc.data(),
          } as VerificationRequest);
        });
        setRequests(requestsData);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching verification requests:", error);
        toast({
          title: "Error",
          description: "Failed to load verification requests",
          variant: "destructive",
        });
        setLoading(false);
      });
    } catch (error) {
      console.error("Error setting up verification requests listener:", error);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch (error) {
          console.error("Error unsubscribing from verification requests:", error);
        }
      }
    };
  }, [toast]);

  const handleApprove = async (requestId: string, userEmail: string) => {
    try {
      const batch = writeBatch(db);
      
      // Update verification request status
      const requestRef = doc(db, "verification_requests", requestId);
      batch.update(requestRef, {
        status: "approved",
        approvedAt: serverTimestamp(),
        approvedBy: userProfile?.email || "admin",
      });

      // Find and update the user's verification status
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef);
      const userSnapshot = await getDoc(doc(db, "users", userEmail));
      
      if (userSnapshot.exists()) {
        const userRef = doc(db, "users", userEmail);
        batch.update(userRef, {
          isVerified: true,
          verifiedAt: serverTimestamp(),
          verifiedBy: userProfile?.email || "admin",
        });
      }

      await batch.commit();

      toast({
        title: "Community Lead Approved",
        description: "The community lead has been approved and can now access their dashboard.",
      });
      
      // Update local state immediately for better UX
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: "approved" as const } : req
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
      toast({
        title: "Error",
        description: "Failed to approve the community lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: string, userEmail: string) => {
    try {
      const batch = writeBatch(db);
      
      // Update verification request status
      const requestRef = doc(db, "verification_requests", requestId);
      batch.update(requestRef, {
        status: "rejected",
        rejectedAt: serverTimestamp(),
        rejectedBy: userProfile?.email || "admin",
      });

      // Optionally update user status (keep them unverified)
      const userSnapshot = await getDoc(doc(db, "users", userEmail));
      if (userSnapshot.exists()) {
        const userRef = doc(db, "users", userEmail);
        batch.update(userRef, {
          isVerified: false,
          rejectedAt: serverTimestamp(),
          rejectedBy: userProfile?.email || "admin",
        });
      }

      await batch.commit();

      toast({
        title: "Community Lead Rejected",
        description: "The community lead application has been rejected.",
      });
      
      // Update local state immediately for better UX
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: "rejected" as const } : req
        )
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast({
        title: "Error",
        description: "Failed to reject the community lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return null;
    }
  };

  const filteredRequests = requests.filter(req => {
    if (selectedTab === "all") return true;
    return req.status === selectedTab;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage community verification requests and system administration
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Requests</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <p className="text-2xl font-bold">{stats.approved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold">{stats.rejected}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending Requests</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="all">All Requests</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="space-y-4">
                {loading ? (
                  <Card className="card-elevated">
                    <CardContent className="p-8 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                        <p className="text-muted-foreground">Loading verification requests...</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : filteredRequests.length === 0 ? (
                  <Card className="card-elevated">
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">
                        No {selectedTab === "all" ? "" : selectedTab} requests found.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredRequests.map((request) => (
                    <Card key={request.id} className="card-elevated">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              {getStatusIcon(request.status)}
                              <h3 className="text-lg font-semibold">
                                {request.communityName}
                              </h3>
                              {getStatusBadge(request.status)}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Community Leader</p>
                                <p className="font-medium">{request.leaderName}</p>
                                <p className="text-muted-foreground">{request.leaderEmail}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Department</p>
                                <p className="font-medium">{request.department}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Expected Members</p>
                                <p className="font-medium">{request.expectedMembers}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Faculty Advisor</p>
                                <p className="font-medium">{request.facultyAdvisor}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Submitted</p>
                                <p className="font-medium">
                                  {new Date(request.submittedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </Button>
                            
                            {request.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="gap-2 bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApprove(request.id, request.userEmail || request.email)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="gap-2"
                                  onClick={() => handleReject(request.id, request.userEmail || request.email)}
                                >
                                  <XCircle className="w-4 h-4" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
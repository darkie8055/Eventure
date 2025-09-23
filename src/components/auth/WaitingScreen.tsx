"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Mail,
  Shield,
  Users,
  LogOut,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  limit
} from "firebase/firestore";

interface VerificationStatus {
  id: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  notes?: string;
}

export function WaitingScreen() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);

  // Real-time listener for verification status
  useEffect(() => {
    if (!userProfile?.email) return;

    let unsubscribe: (() => void) | undefined;

    try {
      const q = query(
        collection(db, "verification_requests"),
        where("email", "==", userProfile.email),
        orderBy("submittedAt", "desc"),
        limit(1)
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          setVerificationStatus({
            id: doc.id,
            status: data.status,
            submittedAt: data.submittedAt,
            approvedAt: data.approvedAt,
            rejectedAt: data.rejectedAt,
            notes: data.notes,
          });

          // If approved, automatically redirect to community dashboard
          if (data.status === "approved") {
            setTimeout(() => {
              router.push("/community-dashboard");
            }, 2000); // 2 second delay to show success message
          }
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching verification status:", error);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error setting up verification status listener:", error);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch (error) {
          console.error("Error unsubscribing from verification status:", error);
        }
      }
    };
  }, [userProfile?.email, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getStatusIcon = () => {
    if (loading) return <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />;
    
    switch (verificationStatus?.status) {
      case "pending":
        return <Clock className="w-8 h-8 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case "rejected":
        return <XCircle className="w-8 h-8 text-red-600" />;
      default:
        return <Shield className="w-8 h-8 text-gray-600" />;
    }
  };

  const getStatusMessage = () => {
    if (loading) return "Checking verification status...";
    
    switch (verificationStatus?.status) {
      case "pending":
        return "Your community lead application is under review";
      case "approved":
        return "Congratulations! Your application has been approved";
      case "rejected":
        return "Your application has been rejected";
      default:
        return "No verification request found";
    }
  };

  const getStatusDescription = () => {
    if (loading) return "Please wait while we check your verification status.";
    
    switch (verificationStatus?.status) {
      case "pending":
        return "Our admin team is reviewing your community lead application. You'll receive an email notification once the review is complete. This process typically takes 1-3 business days.";
      case "approved":
        return "Your community lead application has been approved! You can now access your community dashboard and start managing your community. You'll be redirected automatically.";
      case "rejected":
        return "Unfortunately, your community lead application has been rejected. Please contact our support team for more information or to resubmit your application.";
      default:
        return "We couldn't find a verification request for your account. Please try submitting a new application.";
    }
  };

  const getSubmittedDate = () => {
    if (!verificationStatus?.submittedAt) return null;
    
    try {
      return new Date(verificationStatus.submittedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="card-elevated shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              {getStatusIcon()}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {getStatusMessage()}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Community Lead Verification
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 leading-relaxed">
                {getStatusDescription()}
              </p>
            </div>

            {verificationStatus?.status && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <Badge
                    variant="secondary"
                    className={
                      verificationStatus.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : verificationStatus.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {verificationStatus.status.charAt(0).toUpperCase() + 
                     verificationStatus.status.slice(1)}
                  </Badge>
                </div>

                {getSubmittedDate() && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Submitted:</span>
                    <span className="text-sm text-gray-600">{getSubmittedDate()}</span>
                  </div>
                )}
              </div>
            )}

            {verificationStatus?.status === "approved" && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  You&apos;ll be redirected to your community dashboard in a few seconds...
                </AlertDescription>
              </Alert>
            )}

            {verificationStatus?.status === "rejected" && verificationStatus.notes && (
              <Alert className="bg-red-50 border-red-200">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Reason:</strong> {verificationStatus.notes}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              {verificationStatus?.status === "pending" && (
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Status
                </Button>
              )}

              {verificationStatus?.status === "rejected" && (
                <Button
                  className="w-full gap-2"
                  onClick={() => router.push("/signup")}
                >
                  <Users className="w-4 h-4" />
                  Submit New Application
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Need help? Contact support at{" "}
                <a
                  href="mailto:support@eventure.com"
                  className="text-blue-600 hover:underline"
                >
                  support@eventure.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
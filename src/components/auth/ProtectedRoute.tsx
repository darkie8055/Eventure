"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/contexts/AuthContext";
import { WaitingScreen } from "./WaitingScreen";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  allowedRoles = ["student", "community_lead"],
  redirectTo = "/login",
  requireAuth = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading, userProfile, hasRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip if still loading authentication state
    if (loading) return;

    if (requireAuth && !isAuthenticated) {
      // User is not authenticated but needs to be
      router.push(`${redirectTo}?from=${encodeURIComponent(pathname)}`);
    } else if (isAuthenticated && userProfile) {
      // User is authenticated, check role-based access
      const hasAllowedRole = allowedRoles.some((role) => hasRole(role));

      if (!hasAllowedRole) {
        // User doesn't have required role
        if (userProfile.role === "student") {
          router.push("/student-dashboard");
        } else if (userProfile.role === "community_lead") {
          // Community leads without verification stay on waiting screen
          // They don't get redirected
          if (!userProfile.isVerified) {
            // Don't redirect unverified community leads
            return;
          } else {
            router.push("/community-dashboard");
          }
        } else if (userProfile.role === "admin") {
          router.push("/admin-dashboard");
        } else {
          // Fallback if unknown role
          router.push("/login");
        }
      }
    }
  }, [
    loading,
    isAuthenticated,
    userProfile,
    hasRole,
    allowedRoles,
    router,
    redirectTo,
    pathname,
    requireAuth,
  ]);

  // Show waiting screen for unverified community leads ONLY if they're not on the verification page
  if (
    isAuthenticated &&
    userProfile?.role === "community_lead" &&
    !userProfile.isVerified &&
    pathname !== "/verification"
  ) {
    return <WaitingScreen />;
  }

  // Show nothing while checking authentication to prevent flashing content
  if (
    loading ||
    (requireAuth && !isAuthenticated) ||
    (isAuthenticated &&
      userProfile &&
      !allowedRoles.some((role) => hasRole(role)))
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}

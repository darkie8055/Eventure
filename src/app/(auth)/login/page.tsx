"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { isAuthenticated, userProfile } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      // Redirect based on user role
      if (userProfile.role === "admin") {
        router.push("/admin-dashboard");
      } else if (userProfile.role === "student") {
        router.push("/student-dashboard");
      } else if (userProfile.role === "community_lead") {
        // If community lead is not verified, redirect to verification page
        if (!userProfile.isVerified) {
          router.push("/verification");
        } else {
          router.push("/community-dashboard");
        }
      }
    }
  }, [isAuthenticated, userProfile, router]);

  const getRedirectUrl = () => {
    // This function is used by LoginForm to determine where to redirect after login
    // It will be overridden by the useEffect above if the user is already authenticated
    return "/student-dashboard";
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to access your campus community and discover amazing events"
    >
      <LoginForm redirectUrl={getRedirectUrl()} />
    </AuthLayout>
  );
}

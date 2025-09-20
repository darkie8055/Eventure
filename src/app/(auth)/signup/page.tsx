"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { isAuthenticated, userProfile } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      // Redirect based on user role
      if (userProfile.role === "student") {
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

  return (
    <AuthLayout
      title="Join Eventure"
      subtitle="Create your account and start connecting with your campus community"
    >
      <SignupForm />
    </AuthLayout>
  );
}

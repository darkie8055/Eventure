"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const getRedirectUrl = () => {
    // This function is used by LoginForm to determine where to redirect after login
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

"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navigation } from "@/components/layout/Navigation";

export default function CommunityProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["community_lead"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Community Profile
          </h1>
          <p className="text-muted-foreground">
            Community profile page - coming soon
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
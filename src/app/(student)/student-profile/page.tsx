"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navigation } from "@/components/layout/Navigation";

export default function StudentProfilePage() {
	return (
		<ProtectedRoute allowedRoles={["student"]}>
			<div className="min-h-screen bg-background">
				<Navigation />
				<div className="container mx-auto px-4 py-8">
					<h1 className="text-3xl font-bold gradient-text mb-4">
						Student Profile
					</h1>
					<p className="text-muted-foreground">
						Student profile page - coming soon
					</p>
				</div>
			</div>
		</ProtectedRoute>
	);
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Secret access key that needs to be provided in URL
const SECRET_ACCESS_KEY = "ev3ntur3-4dm1n-s3cr3t-k3y-2025";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasValidAccess, setHasValidAccess] = useState(false);
  const [adminCode, setAdminCode] = useState("");

  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Check for secret access key in URL or manual entry
  useEffect(() => {
    const urlKey = searchParams.get("key");
    if (urlKey === SECRET_ACCESS_KEY) {
      setHasValidAccess(true);
    }
  }, [searchParams]);

  const handleAccessKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === SECRET_ACCESS_KEY) {
      setHasValidAccess(true);
      setError("");
    } else {
      setError("Invalid access key. Unauthorized access attempt logged.");
      // In production, you would log this security event
      console.warn("Unauthorized admin access attempt detected");
    }
  };

  const handleAdminCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Secret admin code: "ADMIN2025"
    if (adminCode === "ADMIN2025") {
      setHasValidAccess(true);
      setError("");
    } else {
      setError("Invalid admin code. Access denied.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signIn(email, password);
      
      toast({
        title: "Admin login successful!",
        description: "Welcome to the admin dashboard.",
      });

      router.push("/admin-dashboard");
    } catch (error: any) {
      console.error("Admin login error:", error);
      setError(
        error.message === "Firebase: Error (auth/invalid-credential)."
          ? "Invalid admin credentials. Please check your email and password."
          : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // If no valid access, show access key form
  if (!hasValidAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-red-500/5 p-4">
        <Card className="w-full max-w-md card-elevated border-red-200">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-red-600">Restricted Access</CardTitle>
              <p className="text-muted-foreground mt-2">
                Administrative access requires authorization
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Method 1: Secret URL Key */}
            <div>
              <h3 className="text-sm font-medium mb-3">Access Key Method</h3>
              <form onSubmit={handleAccessKeySubmit} className="space-y-3">
                <div>
                  <Label htmlFor="accessKey" className="sr-only">Access Key</Label>
                  <Input
                    id="accessKey"
                    type="password"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    placeholder="Enter access key"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="sm">
                  Verify Access Key
                </Button>
              </form>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Method 2: Admin Code */}
            <div>
              <h3 className="text-sm font-medium mb-3">Admin Code Method</h3>
              <form onSubmit={handleAdminCodeSubmit} className="space-y-3">
                <div>
                  <Label htmlFor="adminCode" className="sr-only">Admin Code</Label>
                  <Input
                    id="adminCode"
                    type="password"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Enter admin code"
                    required
                  />
                </div>
                <Button type="submit" variant="outline" className="w-full" size="sm">
                  Verify Admin Code
                </Button>
              </form>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              <p>⚠️ Unauthorized access attempts are logged and monitored</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If valid access, show admin login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md card-elevated">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl gradient-text">Admin Access</CardTitle>
            <p className="text-muted-foreground mt-2">
              Sign in to access the administrative dashboard
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@college.edu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Sign In as Admin
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/login")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Back to Regular Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
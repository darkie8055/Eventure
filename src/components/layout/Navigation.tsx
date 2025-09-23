"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { FirestoreErrorBoundary } from "@/components/FirestoreErrorBoundary";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  Home,
  BookmarkIcon,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Plus,
  MessageCircle,
  Users,
  FileText,
  UserCheck,
  User,
  ChevronDown,
} from "lucide-react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile, isAuthenticated, signOut } = useAuth();

  // Define navigation items based on user role
  const studentNavItems = [
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/communities", label: "Communities", icon: Users },
    { path: "/chat", label: "Chat", icon: MessageCircle },
    { path: "/bookmarks", label: "Bookmarks", icon: BookmarkIcon },
    { path: "/student-dashboard", label: "Dashboard", icon: Settings },
  ];

  const communityLeadNavItems = [
    { path: "/community-dashboard", label: "Dashboard", icon: Home },
    { path: "/events/manage", label: "Manage Events", icon: Calendar },
    { path: "/community/chat", label: "Messages", icon: MessageCircle },
  ];

  const adminNavItems = [
    { path: "/admin-dashboard", label: "Admin Dashboard", icon: Settings },
    { path: "/admin/users", label: "User Management", icon: Users },
    { path: "/admin/communities", label: "Communities", icon: Users },
    { path: "/admin/reports", label: "Reports", icon: FileText },
  ];

  // Get the appropriate nav items based on user role and verification status
  const getNavItems = () => {
    if (userProfile?.role === "admin") {
      return adminNavItems;
    }
    if (userProfile?.role === "community_lead" && userProfile?.isVerified === true) {
      return communityLeadNavItems;
    }
    return studentNavItems;
  };

  const navItems = getNavItems();

  const isActivePath = (path: string) => pathname === path;

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <span className="text-sm font-bold text-primary-foreground">
                E
              </span>
            </div>
            <span className="text-xl font-bold gradient-text">Eventure</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && userProfile && (
              <>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActivePath(item.path)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                <FirestoreErrorBoundary fallback={<div className="p-2 text-muted-foreground text-xs">Notifications temporarily unavailable</div>}>
                  <NotificationBell />
                </FirestoreErrorBoundary>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && userProfile ? (
              <div className="flex items-center space-x-3">
                {/* Desktop User Dropdown */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {userProfile && userProfile.name
                              ? userProfile.name
                              : "User"}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {userProfile.role === "admin"
                              ? "Administrator"
                              : userProfile.role === "community_lead" && userProfile.isVerified === true
                              ? "Community Lead"
                              : "Student"}
                          </Badge>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {userProfile && userProfile.name
                              ? userProfile.name.charAt(0).toUpperCase()
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link 
                          href={userProfile.role === "community_lead" ? "/community-profile" : "/student-profile"} 
                          className="flex items-center"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link 
                          href={userProfile.role === "community_lead" ? "/community-profile" : "/student-profile"} 
                          className="flex items-center"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background">
            <div className="py-4 space-y-3">
              {isAuthenticated && userProfile ? (
                <>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                          isActivePath(item.path)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}

                  {userProfile.role === "community_lead" &&
                    userProfile.isVerified === true && (
                      <Button className="mx-4 gap-2" asChild>
                        <Link
                          href="/events/create"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Plus className="h-4 w-4" />
                          Create Event
                        </Link>
                      </Button>
                    )}

                  <div className="px-4 pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {userProfile && userProfile.name
                            ? userProfile.name.charAt(0).toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {userProfile && userProfile.name
                            ? userProfile.name
                            : "User"}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {userProfile.role === "admin"
                            ? "Administrator"
                            : userProfile.role === "community_lead" && userProfile.isVerified === true
                            ? "Community Lead"
                            : "Student"}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="px-4 space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  fetchUserProfile,
  createFallbackProfile,
  getOrCreateUserProfile,
} from "@/utils/authHelpers";

// Define types for user roles
export type UserRole = "student" | "community_lead" | "admin";

// User profile interface
export interface UserProfile {
  uid: string;
  email: string | null;
  name: string;
  role: UserRole;
  college?: string;
  department?: string;
  createdAt: string;
  // Additional fields for students
  year?: string;
  // Additional fields for community leads
  phone?: string;
  communityName?: string;
  communityType?: string;
  isVerified?: boolean;
}

// Auth context interface
interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    userData: Omit<UserProfile, "uid" | "email" | "createdAt">
  ) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const currentUserRef = useRef<string | null>(null);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Set the user from Firebase Auth
      setUser(firebaseUser);

      // If there's no user, clear the profile
      if (!firebaseUser) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      // Skip profile fetching if we already have a profile for this user
      // This prevents redundant calls during signup flow
      if (currentUserRef.current === firebaseUser.uid) {
        setLoading(false);
        return;
      }

      // Debug authentication process
      console.log(
        "Authentication state change detected for:",
        firebaseUser.email
      );

      // User is authenticated and auto login is enabled
      try {
        // Update the current user ref
        currentUserRef.current = firebaseUser.uid;
        
        // Use the helper function to get or create user profile
        const profile = await getOrCreateUserProfile(db, firebaseUser);
        setUserProfile(profile);

        // If this was a fallback profile (no createdAt from Firestore), try to save it
        if (
          !profile.createdAt.includes("Z") &&
          !profile.createdAt.includes("T")
        ) {
          try {
            const updatedProfile = {
              ...profile,
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, "users", firebaseUser.uid), updatedProfile);
            console.log("Created missing user profile in Firestore");
          } catch (createError) {
            console.error("Failed to create missing profile:", createError);
          }
        }
      } catch (error: any) {
        console.error("Error handling auth state change:", error);

        // For serious errors, sign out
        if (error.code !== "permission-denied") {
          await firebaseSignOut(auth);
          setUserProfile(null);
        } else {
          // For permission errors, use fallback profile
          const fallbackProfile = createFallbackProfile(firebaseUser);
          setUserProfile(fallbackProfile);
        }
      }

      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []); // No dependencies needed

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      try {
        // Use the helper function to get or create user profile
        const userProfile = await getOrCreateUserProfile(
          db,
          userCredential.user
        );
        setUserProfile(userProfile);
        currentUserRef.current = userCredential.user.uid;

        // If the profile was created as a fallback, try to save it to Firestore
        if (!userProfile.createdAt) {
          try {
            await setDoc(
              doc(db, "users", userCredential.user.uid),
              userProfile
            );
            console.log("Created missing user profile in Firestore");
          } catch (createError) {
            console.error(
              "Failed to create profile in Firestore:",
              createError
            );
            // Continue with the fallback profile even if saving fails
          }
        }
        
      } catch (error: any) {
        console.error("Error handling user profile:", error);

        // Create a fallback profile as last resort
        const fallbackProfile = createFallbackProfile(userCredential.user);
        setUserProfile(fallbackProfile);
        currentUserRef.current = userCredential.user.uid;
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (
    email: string,
    password: string,
    userData: Omit<UserProfile, "uid" | "email" | "createdAt">
  ) => {
    try {
      setLoading(true);
      
      // Create user in Firebase Auth and profile in Firestore concurrently
      // This is safe because we know the user data structure
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...userData,
        // Ensure community leads start as unverified
        isVerified: userData.role === "community_lead" ? false : userData.isVerified,
        createdAt: new Date().toISOString(),
      };

      // Set profile immediately to avoid auth state listener delays
      setUserProfile(userProfile);
      currentUserRef.current = userCredential.user.uid;
      
      // Save to Firestore in background (don't await to speed up UI)
      setDoc(doc(db, "users", userCredential.user.uid), userProfile).catch((error) => {
        console.error("Failed to save profile to Firestore:", error);
        // Profile is already set in state, so this is not critical for UX
      });
      
    } catch (error: any) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  // Check if user has a specific role or one of several roles
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!userProfile) return false;

    if (Array.isArray(roles)) {
      return roles.includes(userProfile.role);
    }

    return userProfile.role === roles;
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

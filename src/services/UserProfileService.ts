import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  deleteDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile, UserRole } from "@/contexts/AuthContext";

/**
 * Service for handling user profile operations with Firestore
 */
export class UserProfileService {
  // Collection reference
  private static usersCollection = collection(db, "users");

  /**
   * Create a new user profile in Firestore
   * @param user User profile data
   * @returns Promise that resolves when the profile is created
   */
  static async createProfile(user: UserProfile): Promise<void> {
    try {
      const userRef = doc(this.usersCollection, user.uid);
      await setDoc(userRef, {
        ...user,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  /**
   * Get a user profile by user ID
   * @param uid User ID
   * @returns The user profile or null if not found
   */
  static async getProfileById(uid: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(this.usersCollection, uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  }

  /**
   * Get user profile by email address
   * @param email Email address
   * @returns The user profile or null if not found
   */
  static async getProfileByEmail(email: string): Promise<UserProfile | null> {
    try {
      const q = query(this.usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data() as UserProfile;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting user profile by email:", error);
      throw error;
    }
  }

  /**
   * Update a user profile
   * @param uid User ID
   * @param data Data to update
   * @returns Promise that resolves when the profile is updated
   */
  static async updateProfile(
    uid: string,
    data: Partial<UserProfile>
  ): Promise<void> {
    try {
      const userRef = doc(this.usersCollection, uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  /**
   * Delete a user profile
   * @param uid User ID
   * @returns Promise that resolves when the profile is deleted
   */
  static async deleteProfile(uid: string): Promise<void> {
    try {
      const userRef = doc(this.usersCollection, uid);
      await deleteDoc(userRef);
    } catch (error) {
      console.error("Error deleting user profile:", error);
      throw error;
    }
  }

  /**
   * Get all users with a specific role
   * @param role User role
   * @returns Array of user profiles with the specified role
   */
  static async getUsersByRole(role: UserRole): Promise<UserProfile[]> {
    try {
      const q = query(this.usersCollection, where("role", "==", role));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => doc.data() as UserProfile);
    } catch (error) {
      console.error("Error getting users by role:", error);
      throw error;
    }
  }

  /**
   * Check if a user has a specific role
   * @param uid User ID
   * @param role Role to check for
   * @returns True if the user has the role, false otherwise
   */
  static async hasRole(
    uid: string,
    role: UserRole | UserRole[]
  ): Promise<boolean> {
    try {
      const profile = await this.getProfileById(uid);

      if (!profile) return false;

      if (Array.isArray(role)) {
        return role.includes(profile.role);
      }

      return profile.role === role;
    } catch (error) {
      console.error("Error checking user role:", error);
      return false;
    }
  }

  /**
   * Set user verification status (for community leads)
   * @param uid User ID
   * @param isVerified Verification status
   */
  static async setVerificationStatus(
    uid: string,
    isVerified: boolean
  ): Promise<void> {
    try {
      const userRef = doc(this.usersCollection, uid);
      await updateDoc(userRef, {
        isVerified,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating verification status:", error);
      throw error;
    }
  }

  /**
   * Get all community leads pending verification
   * @returns Array of community lead profiles pending verification
   */
  static async getPendingCommunityLeads(): Promise<UserProfile[]> {
    try {
      const q = query(
        this.usersCollection,
        where("role", "==", "community_lead"),
        where("isVerified", "==", false)
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => doc.data() as UserProfile);
    } catch (error) {
      console.error("Error getting pending community leads:", error);
      throw error;
    }
  }
}

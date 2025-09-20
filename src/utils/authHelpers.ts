import { doc, getDoc, Firestore } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { UserProfile } from "@/contexts/AuthContext";

/**
 * Safely fetches a user profile from Firestore with error handling
 * @param db Firestore database instance
 * @param userId User ID to fetch the profile for
 * @returns User profile or null if not found
 */
export async function fetchUserProfile(
  db: Firestore,
  userId: string
): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }

    return null;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);

    if (error.code === "permission-denied") {
      // This is a specific case we'll handle differently
      throw {
        code: "permission-denied",
        message: "Insufficient permissions to access user profile",
        originalError: error,
      };
    }

    // Rethrow other errors
    throw error;
  }
}

/**
 * Creates a fallback user profile from Firebase Auth user data
 * This is used when Firestore access fails due to permissions
 * @param firebaseUser Firebase Auth user object
 * @returns A minimal user profile constructed from Auth data
 */
export function createFallbackProfile(
  firebaseUser: FirebaseUser,
  defaultRole: string = "student",
  additionalData: Partial<UserProfile> = {}
): UserProfile {
  // Check email domain for potential community lead detection
  const email = firebaseUser.email || "";
  let inferredRole = defaultRole;
  let isVerified = false;

  // Simple heuristic: if email contains these keywords, might be a community lead
  const communityEmailKeywords = [
    "lead",
    "admin",
    "committee",
    "council",
    "president",
    "chair",
  ];
  const mightBeCommunityLead = communityEmailKeywords.some((keyword) =>
    email.toLowerCase().includes(keyword)
  );

  if (mightBeCommunityLead) {
    inferredRole = "community_lead";
    // Default unverified for safety
    isVerified = false;
  }

  // Allow override of inferred values with explicitly provided data
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name:
      firebaseUser.displayName ||
      (firebaseUser.email ? firebaseUser.email.split("@")[0] : "User"),
    role: (additionalData.role || inferredRole) as any,
    // Include verification status for community leads
    isVerified: additionalData.isVerified || isVerified,
    createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
    // Spread any additional data provided
    ...additionalData,
  };
}

/**
 * Try to detect the user role from email patterns
 * This is a fallback when Firestore access fails
 */
function detectUserRole(email: string | null): {
  role: string;
  additionalData: Partial<UserProfile>;
} {
  if (!email) return { role: "student", additionalData: {} };

  const emailLower = email.toLowerCase();

  // Check for community lead patterns in email
  const communityPatterns = [
    "lead",
    "admin",
    "president",
    "chair",
    "secretary",
    "coordinator",
    "committee",
    "council",
    "board",
    "society",
    "club",
  ];

  const isCommunityEmail = communityPatterns.some((pattern) =>
    emailLower.includes(pattern)
  );

  if (isCommunityEmail) {
    // Try to extract potential community name from email
    let communityName = "";
    const beforeAt = emailLower.split("@")[0];

    // Extract possible community name from email
    communityPatterns.forEach((pattern) => {
      if (beforeAt.includes(pattern)) {
        // Extract what's before the pattern as potential community name
        const parts = beforeAt.split(pattern);
        if (parts[0] && parts[0].length > 3) {
          communityName = parts[0].trim().replace(/[^a-z]/g, " ");
          communityName = communityName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
      }
    });

    if (!communityName && email.includes("@")) {
      // Try to extract from domain
      const domainPart = email.split("@")[1].split(".")[0];
      if (
        domainPart !== "gmail" &&
        domainPart !== "yahoo" &&
        domainPart !== "hotmail"
      ) {
        communityName =
          domainPart.charAt(0).toUpperCase() + domainPart.slice(1) + " Group";
      }
    }

    return {
      role: "community_lead",
      additionalData: {
        communityName: communityName || undefined,
        isVerified: false, // Always require verification for detected community leads
      },
    };
  }

  // Default to student
  return { role: "student", additionalData: {} };
}

/**
 * Enhanced login helper that handles permissions errors gracefully
 * @param db Firestore database instance
 * @param firebaseUser Firebase authenticated user
 * @returns User profile either from Firestore or fallback from Auth
 */
export async function getOrCreateUserProfile(
  db: Firestore,
  firebaseUser: FirebaseUser
): Promise<UserProfile> {
  try {
    // First try to get the profile from Firestore
    const profile = await fetchUserProfile(db, firebaseUser.uid);

    if (profile) {
      console.log("Found user profile in Firestore:", profile.role);
      return profile;
    }

    // If no profile exists, create a fallback
    console.warn("No user profile found in Firestore. Using fallback data.");

    // Try to detect user role from their email
    const { role, additionalData } = detectUserRole(firebaseUser.email);
    console.log(`Detected role for ${firebaseUser.email}: ${role}`);

    return createFallbackProfile(firebaseUser, role, additionalData);
  } catch (error: any) {
    if (error.code === "permission-denied") {
      // For permission errors, create a fallback profile
      console.warn(
        "Permission denied when fetching profile. Using Auth data only."
      );

      // Try to detect user role from their email
      const { role, additionalData } = detectUserRole(firebaseUser.email);
      console.log(`Detected role for ${firebaseUser.email}: ${role}`);

      return createFallbackProfile(firebaseUser, role, additionalData);
    }

    // Rethrow other errors
    throw error;
  }
}

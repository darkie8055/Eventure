// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { UserProfile, UserRole } from "@/contexts/AuthContext";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUTQ9w3EM8q0aczWeRVTIGkuGhPB0aEjs",
  authDomain: "eventure-15b7c.firebaseapp.com",
  projectId: "eventure-15b7c",
  storageBucket: "eventure-15b7c.appspot.com",
  messagingSenderId: "964959186691",
  appId: "1:964959186691:web:73e5909ae8f440f538c336",
  measurementId: "G-PW3M1KMDKS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Authentication helper functions
 */

// Login with email and password
export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// Register a new user
export const registerUser = async (
  email: string,
  password: string,
  userData: Omit<UserProfile, "uid" | "email" | "createdAt">
) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      ...userData,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", user.uid), userProfile);

    // Send email verification if it's a community lead
    if (userData.role === "community_lead") {
      await sendEmailVerification(user);
    }

    return { user, userProfile };
  } catch (error) {
    throw error;
  }
};

// Sign out current user
export const logoutUser = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Send password reset email
export const sendPasswordReset = async (email: string) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

/**
 * Firestore helper functions
 */

// Get user profile from Firestore
export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Update user profile in Firestore
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
) => {
  try {
    await updateDoc(doc(db, "users", uid), data);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Get users by role
export const getUsersByRole = async (role: UserRole) => {
  try {
    const q = query(collection(db, "users"), where("role", "==", role));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as UserProfile);
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error;
  }
};

export { app, auth, db };

// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUTQ9w3EM8q0aczWeRVTIGkuGhPB0aEjs",
  authDomain: "eventure-15b7c.firebaseapp.com",
  projectId: "eventure-15b7c",
  storageBucket: "eventure-15b7c.appspot.com",
  messagingSenderId: "964959186691",
  appId: "1:964959186691:web:73e5909ae8f440f538c336",
  measurementId: "G-PW3M1KMDKS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
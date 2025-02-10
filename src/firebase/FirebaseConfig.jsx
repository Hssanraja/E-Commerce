// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDofq0xgMXXnnOlJXg2qJ1dyFNlE7m4Fr8",
  authDomain: "e-commerce-79c00.firebaseapp.com",
  projectId: "e-commerce-79c00",
  storageBucket: "e-commerce-79c00.firebasestorage.app",
  messagingSenderId: "444004441285",
  appId: "1:444004441285:web:b8ef7d5bcbf8d83754e4ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth};

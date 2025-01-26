// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEgIF4cnNup81V_mYuv8Q1myys6KxTZFA",
  authDomain: "blogging-app-177c2.firebaseapp.com",
  projectId: "blogging-app-177c2",
  storageBucket: "blogging-app-177c2.firebasestorage.app",
  messagingSenderId: "407862649334",
  appId: "1:407862649334:web:b2e56b74a2a3727d6c67d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB8tjhjKpLp3F78VYXjyQ3FZd2pKaU0x3U",
  authDomain: "art-store2.firebaseapp.com",
  databaseURL: "https://art-store2-default-rtdb.firebaseio.com",
  projectId: "art-store2",
  storageBucket: "art-store2.firebasestorage.app",
  messagingSenderId: "441899092930",
  appId: "1:441899092930:web:753051962e8bbc9e77245b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database service
const database = getDatabase(app);
// Export the necessary database functions
export { app, database };

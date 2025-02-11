import firebase from "firebase/app";
import "firebase/database";

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
firebase.initializeApp(firebaseConfig);

export default firebase;

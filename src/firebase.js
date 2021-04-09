import firebase from 'firebase/app';
import 'firebase/database';
 
 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAXQz1-CBFMt57j5yQCav8oEOtHdWaPcpE",
    authDomain: "art-store-6d140.firebaseapp.com",
    projectId: "art-store-6d140",
    storageBucket: "art-store-6d140.appspot.com",
    messagingSenderId: "690801099215",
    appId: "1:690801099215:web:4e5952ffcbacfd9a3852ba"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
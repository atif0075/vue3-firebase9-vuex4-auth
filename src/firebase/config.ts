import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAtej6zOmoFggbk1OUgaYns4AUR5OQm_fc",
  authDomain: "quasarapp-46498.firebaseapp.com",
  projectId: "quasarapp-46498",
  storageBucket: "quasarapp-46498.appspot.com",
  messagingSenderId: "365106291378",
  appId: "1:365106291378:web:9fe89e4b23e40fb6525fab"
};


initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore()
export { db, auth, provider, signInWithPopup, };


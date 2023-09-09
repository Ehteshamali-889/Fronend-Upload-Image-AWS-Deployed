import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPxVQcMHtRHaR9EbAQbvnXxLx4LQqucI0",
  authDomain: "login-28f4e.firebaseapp.com",
  projectId: "login-28f4e",
  storageBucket: "login-28f4e.appspot.com",
  messagingSenderId: "517448221443",
  appId: "1:517448221443:web:1619d7eed3a060e2005f36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const  provider=new GoogleAuthProvider();
export const db = getFirestore(app);
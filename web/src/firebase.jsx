// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiKwpjcUj1ar28jv6tFczmdoxSeE24WXA",
  authDomain: "ab-testing-2a6e8.firebaseapp.com",
  projectId: "ab-testing-2a6e8",
  storageBucket: "ab-testing-2a6e8.firebasestorage.app",
  messagingSenderId: "501344945682",
  appId: "1:501344945682:web:34a31dc07311a14279facb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);

export const googleProvider = new GoogleAuthProvider();
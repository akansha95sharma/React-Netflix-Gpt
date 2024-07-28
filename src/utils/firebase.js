// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkioaPu0_yl2PWwhSlipnMjxNcWbuqkZM",
  authDomain: "netflixgpt-e54de.firebaseapp.com",
  projectId: "netflixgpt-e54de",
  storageBucket: "netflixgpt-e54de.appspot.com",
  messagingSenderId: "333948522024",
  appId: "1:333948522024:web:f3eb2b50f5534a4096ef1d",
  measurementId: "G-D54B0PGGN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
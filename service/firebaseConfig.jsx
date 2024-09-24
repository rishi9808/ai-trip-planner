// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAXGfHdcEzcGXNEhVfdWS6_XWkEhqjgK0",
  authDomain: "travel-buddy-8b2f4.firebaseapp.com",
  projectId: "travel-buddy-8b2f4",
  storageBucket: "travel-buddy-8b2f4.appspot.com",
  messagingSenderId: "576700719578",
  appId: "1:576700719578:web:2f96c13e6fb3a8d2afa0e3",
  measurementId: "G-BR8D5PBZKW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app); 
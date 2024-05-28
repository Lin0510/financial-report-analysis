// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvTOTYw6PYZV8UDQh1_OCmrQIDf3t93Lw",
  authDomain: "financial-report-8ab7f.firebaseapp.com",
  projectId: "financial-report-8ab7f",
  storageBucket: "financial-report-8ab7f.appspot.com",
  messagingSenderId: "579886828766",
  appId: "1:579886828766:web:856229c499669aa32bc64f",
  measurementId: "G-FTZQTNMXWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjL3Dnm3JMbsaEfdiD9Yg17eW-O7Fwnx4",
  authDomain: "inha-da2f5.firebaseapp.com",
  projectId: "inha-da2f5",
  storageBucket: "inha-da2f5.appspot.com",
  messagingSenderId: "20138831634",
  appId: "1:20138831634:web:71b9ec297d1f3b50bf0dcb",
  measurementId: "G-LQSC6JZHCL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
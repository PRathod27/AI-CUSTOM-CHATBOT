// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
// import { getAnalytics } from "firebase/analytics";
import "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHJzHDLnVNLulZTVEc13DaV8n6sg9caxc",
  authDomain: "ai-chat-support.firebaseapp.com",
  projectId: "ai-chat-support",
  storageBucket: "ai-chat-support.appspot.com",
  messagingSenderId: "4980515246",
  appId: "1:4980515246:web:e8365210a16cb3b368e83f",
  measurementId: "G-2W0873ET06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
export  {app, auth}
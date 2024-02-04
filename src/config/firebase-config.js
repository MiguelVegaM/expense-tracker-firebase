// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARNRFuJ7rn9sdtL23xOXiJYvSZDpnYNJg",
  authDomain: "expense-tracker-9ec27.firebaseapp.com",
  projectId: "expense-tracker-9ec27",
  storageBucket: "expense-tracker-9ec27.appspot.com",
  messagingSenderId: "521766645591",
  appId: "1:521766645591:web:afe358facef325e29b1812",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy

// To keep deploying into hosting
//  npm run build
//  git add. git commit git push
//  firebase deploy

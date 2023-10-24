// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfdN7FsNdaJgv7j8a9aMfJ5f5whSYKnOc",
  authDomain: "mobileapp-f8326.firebaseapp.com",
  projectId: "mobileapp-f8326",
  storageBucket: "mobileapp-f8326.appspot.com",
  messagingSenderId: "586150774715",
  appId: "1:586150774715:web:cccce5ff9cc9983f38269e",
  measurementId: "G-GNZQ5FHBEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const Storage = getStorage(app);
export const Auth = getAuth(app);


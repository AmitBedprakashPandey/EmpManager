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
  apiKey: "AIzaSyCx3BJSC9aXfayWuOjtQcUfpys0tqSqrfI",
  authDomain: "empmanager-7872b.firebaseapp.com",
  projectId: "empmanager-7872b",
  storageBucket: "empmanager-7872b.appspot.com",
  messagingSenderId: "299628024022",
  appId: "1:299628024022:web:b19c8f2948b209f7c4f977"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const Storage = getStorage(app);
export const Auth = getAuth(app);


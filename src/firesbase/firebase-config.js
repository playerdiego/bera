// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider} from '@firebase/auth';
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVL9faHk3SJWA6Pw5fjyU5nBuYkxtQyv8",
  authDomain: "bera-ref.firebaseapp.com",
  projectId: "bera-ref",
  storageBucket: "bera-ref.appspot.com",
  messagingSenderId: "883193208320",
  appId: "1:883193208320:web:d17e8f5da514ba58bac2e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();


const googleAuthProvider = new GoogleAuthProvider();

export {db, storage, googleAuthProvider, firebase, app};
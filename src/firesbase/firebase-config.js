// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider} from '@firebase/auth';
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPjCjkvC7zby5fYPqydyp5p0LMUBW_k2w",
  authDomain: "bera-fadiku-ref.firebaseapp.com",
  projectId: "bera-fadiku-ref",
  storageBucket: "bera-fadiku-ref.appspot.com",
  messagingSenderId: "815483659505",
  appId: "1:815483659505:web:71145bdc086395176b7550"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();


const googleAuthProvider = new GoogleAuthProvider();

export {db, storage, googleAuthProvider, firebase, app};
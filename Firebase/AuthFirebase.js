
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat';
import { getFirestore} from 'firebase/firestore/lite';
import { collection } from "firebase/firestore";






// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACfEdvOj6dJg-WuxnFFH4pFejKr9m3uQs",
  authDomain: "ekonsulta-d7895.firebaseapp.com",
  projectId: "ekonsulta-d7895",
  storageBucket: "ekonsulta-d7895.appspot.com",
  messagingSenderId: "785094099949",
  appId: "1:785094099949:web:c037cd29f9d437b9011de4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


export const authentication =  getAuth(app);
export const db =  getFirestore(app);
export const fireStoreDb = app.firestore();




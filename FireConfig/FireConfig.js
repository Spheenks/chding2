// Import the functions you need from the SDKs you need
// import 'firebase/compat/app';
import firebase from 'firebase/compat';
// import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export const db = firebase.firestore();
export {firebase};

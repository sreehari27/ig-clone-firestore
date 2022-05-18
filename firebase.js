// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZqX9pYIm56Zedk07j3r-UsOnxPvixmHE",
  authDomain: "rn-ig-clone-11e67.firebaseapp.com",
  projectId: "rn-ig-clone-11e67",
  storageBucket: "rn-ig-clone-11e67.appspot.com",
  messagingSenderId: "233016643774",
  appId: "1:233016643774:web:bce85026f481968e324eef"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
firebase.firestore().settings({ experimentalForceLongPolling: true, merge:true })

const db = firebase.firestore()

export {firebase, db}
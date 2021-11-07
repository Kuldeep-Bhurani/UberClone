// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0vQ3WkKsUqkAFjQhEHWbDL_ggLrRUKkg",
    authDomain: "uber-clone-31712.firebaseapp.com",
    projectId: "uber-clone-31712",
    storageBucket: "uber-clone-31712.appspot.com",
    messagingSenderId: "110927221491",
    appId: "1:110927221491:web:13bcf7ee5a66a3ccd2dd86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth()

export { app, provider, auth }
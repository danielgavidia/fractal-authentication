// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBlZwZftncrO8jqJiikNp3wqcPXs4Si1eE",
    authDomain: "fractal-authentication.firebaseapp.com",
    projectId: "fractal-authentication",
    storageBucket: "fractal-authentication.appspot.com",
    messagingSenderId: "545171661297",
    appId: "1:545171661297:web:5c19c6a8a9f2ee8c3ee450",
    measurementId: "G-PFDSZQMMZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

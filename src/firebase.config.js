import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCCCzHC0AfXWaS-r2pfYRCDfKRKyarTns",
    authDomain: "uy-market-2a614.firebaseapp.com",
    projectId: "uy-market-2a614",
    storageBucket: "uy-market-2a614.appspot.com",
    messagingSenderId: "832810235378",
    appId: "1:832810235378:web:03ef4540649f6433f8676b",
    measurementId: "G-9FGYH9GZCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore();

export { auth, db };
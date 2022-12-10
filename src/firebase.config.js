import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAkcItZdM3dUYEYLk9LDwb12G2Lej2b1o",
    authDomain: "uy-market.firebaseapp.com",
    projectId: "uy-market",
    storageBucket: "uy-market.appspot.com",
    messagingSenderId: "956077088732",
    appId: "1:956077088732:web:53d8e03f8d3e84a3a2b919"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
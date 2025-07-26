// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxnDUmjHr_DlCzuBeARjLBiXaN7q47U5U",
  authDomain: "saylani-admin-9aa6e.firebaseapp.com",
  projectId: "saylani-admin-9aa6e",
  storageBucket: "saylani-admin-9aa6e.firebasestorage.app",
  messagingSenderId: "807060144601",
  appId: "1:807060144601:web:0a3b46186f47d9043999c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db= getFirestore(app);
export{auth, db,};
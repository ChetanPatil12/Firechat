// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDk2eNYP1vfSLoethzlg9ogSbXwr0uAcg",
  authDomain: "firechat-27c17.firebaseapp.com",
  projectId: "firechat-27c17",
  storageBucket: "firechat-27c17.appspot.com",
  messagingSenderId: "637219702722",
  appId: "1:637219702722:web:0cf3e68c4394353146b85b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
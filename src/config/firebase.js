import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged

 } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPzeWCahPStU--NjXuUOUdYmI_5PEN728",
  authDomain: "chat-app-f9290.firebaseapp.com",
  projectId: "chat-app-f9290",
  storageBucket: "chat-app-f9290.appspot.com",
  messagingSenderId: "394393946129",
  appId: "1:394393946129:web:df69fd9306c04370b549b0",
  measurementId: "G-L6HB8P7TLQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged
}
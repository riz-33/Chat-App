import { initializeApp } from "firebase/app";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {
  getFirestore, doc, setDoc, getDoc, collection, serverTimestamp, updateDoc, addDoc,
  onSnapshot, query, orderBy, getDocs, where
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPzeWCahPStU--NjXuUOUdYmI_5PEN728",
  authDomain: "chat-app-f9290.firebaseapp.com",
  projectId: "chat-app-f9290",
  storageBucket: "chat-app-f9290.firebasestorage.app",
  messagingSenderId: "394393946129",
  appId: "1:394393946129:web:df69fd9306c04370b549b0",
  measurementId: "G-L6HB8P7TLQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export {
  app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, db, doc, setDoc, getDoc,
  signOut, collection, serverTimestamp, updateDoc, addDoc, onSnapshot, query, orderBy, getDocs, where,
  GoogleAuthProvider, signInWithPopup, googleProvider, getStorage, ref, uploadBytesResumable, getDownloadURL, storage
}
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZZ2vPWcb64vhuaI583f4gPB0ecCBrXE0",
  authDomain: "netflix-clone-cefc0.firebaseapp.com",
  projectId: "netflix-clone-cefc0",
  storageBucket: "netflix-clone-cefc0.appspot.com",
  messagingSenderId: "995408896950",
  appId: "1:995408896950:web:fe06bae24cfb76b36b9717",
  measurementId: "G-E5HTHXBDGT"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
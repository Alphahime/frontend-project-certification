import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyD6YzI2HJJyHtxh3OzTmfGPXVyyDCrHYrY",
  
    authDomain: "certification-19510.firebaseapp.com",
  
    databaseURL: "https://certification-19510-default-rtdb.firebaseio.com",
  
    projectId: "certification-19510",
  
    storageBucket: "certification-19510.appspot.com",
  
    messagingSenderId: "228919711673",
  
    appId: "1:228919711673:web:59b494b8e61a1c76e80868",
  
    measurementId: "G-1Y73CYF6DK"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };

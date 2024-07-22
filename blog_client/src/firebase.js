import { initializeApp } from 'firebase/app';
//import { getAuth } from 'firebase/auth';

// Your Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'techherblog.firebaseapp.com',
  projectId: 'techherblog',
  storageBucket: 'techherblog.appspot.com',
  messagingSenderId: '264773397883',
  appId: '1:264773397883:web:17a4a72abd94a5515121de',
};;

// Log configuration for debugging
console.log("Firebase Config:", firebaseConfig);

// Initialize Firebase

export const app = initializeApp(firebaseConfig); 
//export const auth = getAuth(app);


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBk4db78yv0YyucCN0OnIxFtpXMmlS3tVg',
  authDomain: 'signal-clone-e785b.firebaseapp.com',
  projectId: 'signal-clone-e785b',
  storageBucket: 'signal-clone-e785b.appspot.com',
  messagingSenderId: '833859165600',
  appId: '1:833859165600:web:00acd2b61b819d2cb4d8c5',
};

initializeApp(firebaseConfig);

export const auth = getAuth();

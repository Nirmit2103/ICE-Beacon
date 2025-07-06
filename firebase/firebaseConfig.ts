// firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD9iZVqyaV114VrXRnaLXtl_nNiXdD9LlA',
  authDomain: 'gen-lang-client-0248926773.firebaseapp.com',
  projectId: 'gen-lang-client-0248926773',
  storageBucket: 'gen-lang-client-0248926773.appspot.com',
  messagingSenderId: '1072461157231',
  appId: '1:1072461157231:web:55ef28d03acbf104324e9a'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

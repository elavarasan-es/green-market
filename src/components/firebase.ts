// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBhB2oJQcfEZ04fHDE_30VGfy4MBuSj0ao",
  authDomain: "prince-cart.firebaseapp.com",
  projectId: "prince-cart",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

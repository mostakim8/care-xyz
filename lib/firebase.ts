import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9i4YuX6qd9vFAx9lw8KKzNcQqzq2SpzM",
  authDomain: "care-xyz-ec61c.firebaseapp.com",
  projectId: "care-xyz-ec61c",
  storageBucket: "care-xyz-ec61c.firebasestorage.app",
  messagingSenderId: "123696587700",
  appId: "G-XBE6ZFBT80",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

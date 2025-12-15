import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0nLCn1ISTOKKkQzqqKdTZx8LyvtIbdjg",
  authDomain: "shared-countdown.firebaseapp.com",
  projectId: "shared-countdown",
  storageBucket: "shared-countdown.firebasestorage.app",
  messagingSenderId: "811014101634",
  appId: "1:811014101634:web:22cd677dc76daeed3ff29b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

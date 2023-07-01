// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjMSlPybZwXJGFpLoFvziYTiSC-WVypKI",
  authDomain: "fir-listing-fc6ea.firebaseapp.com",
  databaseURL: "https://fir-listing-fc6ea-default-rtdb.firebaseio.com",
  projectId: "fir-listing-fc6ea",
  storageBucket: "fir-listing-fc6ea.appspot.com",
  messagingSenderId: "841385090676",
  appId: "1:841385090676:web:87461e3f30612be918bb21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const storage = getStorage(app);

export { firebaseAuth, storage };

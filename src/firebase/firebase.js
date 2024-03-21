import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDRVg1CRIlUIzQNAGLe_xGBZcs9m67j5E",
  authDomain: "busybuy-41eb2.firebaseapp.com",
  projectId: "busybuy-41eb2",
  storageBucket: "busybuy-41eb2.appspot.com",
  messagingSenderId: "317560984680",
  appId: "1:317560984680:web:f2d6a5241ac75f094957dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

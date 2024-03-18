// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB08bLhfyfSmmjqrS0-l_ZWIrXxmJ7mS3g",
  authDomain: "busybuy-34e02.firebaseapp.com",
  projectId: "busybuy-34e02",
  storageBucket: "busybuy-34e02.appspot.com",
  messagingSenderId: "806409384896",
  appId: "1:806409384896:web:0345b01db665e567828e25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

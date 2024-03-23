// Import for hook
import { createContext, useContext, useEffect, useState } from "react";

// Import for firebase
import {
  addDoc,
  doc,
  collection,
  setDoc,
  getDocs,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import db from "../firebase/firebase";

// Extra imports
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Creation of auth context
const authContext = createContext();

// Auth custom hook to get state of context
export function useAuth() {
  const value = useContext(authContext);
  return value;
}

// Custom context for authentication.
export default function AuthContext({ children }) {
  // States
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // auth to handle authentication from firebase.
  const auth = getAuth();

  // Hook for navigation.
  const navigate = useNavigate();

  // Use effect to check the state of auth on each entry to the website.
  // If user is logged to the firebase, then isLogin is set.
  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      if (data) {
        const snapshot = await getDocs(collection(db, "Users"));
        let userData;
        snapshot.forEach((s) => {
          if (s.data().userId === data.uid) {
            userData = s.id;
          }
        });
        setUser(userData);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  // Function of signing in.
  async function signIn() {
    setIsLoading(true);

    try {
      // Sign in with email and password.
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Check user Collection for geting the userId.
      const snapshot = await getDocs(collection(db, "Users"));
      let userData;
      snapshot.forEach((s) => {
        if (s.data() && s.data().userId === userCredential.user.uid) {
          userData = s.id;
        }
      });

      // User ID is set to the user.
      setUser(userData);
      setIsLogin(true);

      // After sign in page is redirected to home.
      navigate("/");

      // Success message.
      toast.success("Log in Successfull");
    } catch (error) {
      // Toast message for different error encountered.
      if (error.code == "auth/invalid-credential") {
        toast.error("Incorrect Credentials");
      } else if (error.code == "auth/invalid-email") {
        toast.error("Incorrect Email");
      } else if (error.code == "auth/invalid-password") {
        toast.error("Incorrect Email");
      } else {
        console.log(error);
      }
    }
    setIsLoading(false);
  }

  // Function for registering new user.
  async function signUp() {
    setIsLoading(true);

    try {
      // new User is created using email and password.
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // A new Doc with user.uid and name is added to Users Collection.
      const docRef = await addDoc(collection(db, "Users"), {
        userName,
        userId: userCredential.user.uid,
      });

      // SetisLogin is set, user is set, message is shown and redirected to home.
      setIsLogin(true);
      setUser(docRef.id);
      toast.success("Registration Successfull");
      navigate("/");
    } catch (err) {
      // Error message is shown.
      if (err.code == "auth/email-already-in-use") {
        toast.error("Email is already in use");
      } else if (err.code == "auth/weak-password") {
        toast.error("Password should be at least 6 characters");
      } else if (
        err.code == "auth/missing-email" ||
        err.code == "auth/missing-password"
      ) {
        toast.error("Missing EmailId or Password");
      }
    }
    setIsLoading(false);
  }

  async function handleSignOut() {
    try {
      setIsLoading(true);
      // Sign out using auth.
      signOut(auth);
      setUser(null);
      navigate("/");
      setIsLoading(false);
      toast.success("Sign out successfull");
    } catch (error) {
      console.log(error);
    }
  }

  // Handling submit from sign in or sign up form.
  function handleSubmit(event, forSignIn) {
    event.preventDefault();
    // if forSignIn is true, signUp function is called
    // else signIn function is called.
    if (!forSignIn) {
      signUp();
    } else {
      signIn();
    }
  }

  return (
    <authContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setName,
        setEmail,
        setPassword,
        handleSubmit,
        handleSignOut,
        isLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

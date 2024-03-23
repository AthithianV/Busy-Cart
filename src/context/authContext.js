import { createContext, useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const authContext = createContext();

export function useAuth() {
  const value = useContext(authContext);
  return value;
}

export default function AuthContext({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

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

  async function signIn() {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const snapshot = await getDocs(collection(db, "Users"));
      let userData;
      snapshot.forEach((s) => {
        if (s.data() && s.data().userId === userCredential.user.uid) {
          userData = s.id;
        }
      });
      setUser(userData);
      setIsLogin(true);
      navigate("/");
      toast.success("Log in Successfull");
    } catch (error) {
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

  async function signUp() {
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = await addDoc(collection(db, "Users"), {
        userName,
        userId: userCredential.user.uid,
      });

      setIsLogin(true);
      setUser(docRef.id);
      toast.success("Registration Successfull");

      navigate("/");
    } catch (err) {
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
      signOut(auth);
      setUser(null);
      navigate("/");
      setIsLoading(false);
      toast.success("Sign out successfull");
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event, forSignIn) {
    event.preventDefault();
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

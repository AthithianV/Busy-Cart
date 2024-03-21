import { createContext, useContext, useEffect, useState } from "react";
import { doc, addDoc, collection, setDoc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import db from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export function useAuth() {
  const value = useContext(authContext);
  return value;
}

export default function AuthContext({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data.user);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  async function signIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function signUp() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await updateDoc(doc(db, "users", user.uid), { userName });
      setIsLogin(true);
      setUser(user);
      navigate("/");
    } catch (err) {
      if (err.code == "auth/email-already-in-use") {
        alert("Email is already in use");
      } else {
        console.log(err);
      }
    }
  }

  async function handleSignOut() {
    try {
      signOut(auth);
      navigate("/");
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
        setName,
        setEmail,
        setPassword,
        handleSubmit,
        handleSignOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

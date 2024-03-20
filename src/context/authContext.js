import { createContext, useContext, useState } from "react";
import db from "../firebase/firebase";

const authContext = createContext();

export function useAuth() {
  const value = useContext(authContext);
  return value;
}

export default function AuthContext({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event, forSignIn) {
    event.preventDefault();
    if (!forSignIn) {
      
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
      }}
    >
      {children}
    </authContext.Provider>
  );
}

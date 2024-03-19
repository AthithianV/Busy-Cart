import { createContext, useContext, useState } from "react";

const authContext = createContext();

export function useAuth() {
  const value = useContext(authContext);
  return value;
}

export default function AuthContext({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <authContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </authContext.Provider>
  );
}
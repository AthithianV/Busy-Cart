// import for hooks.
import { createContext, useContext, useEffect, useState } from "react";

// import for firebase.
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";

// custom hook for auth context.
import { useAuth } from "./authContext";

// Creation of order context.
const orderContext = createContext();

// custom hook for order context.
export function useOrder() {
  const value = useContext(orderContext);
  return value;
}

export default function CustomOrderContext({ children }) {
  const [order, setorder] = useState([]);
  const { user } = useAuth();

  // Funcion to get order.
  async function getOrders() {
    onSnapshot(doc(db, "Orders", user), (doc) => {
      const item = doc.data();
      const ordersList = [];
      if (item) {
        Object.keys(item).forEach((element) => {
          ordersList.push({ [`${element}`]: item[element] });
        });
      }
      setorder(ordersList);
    });
  }

  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  return (
    <orderContext.Provider value={{ order }}>{children}</orderContext.Provider>
  );
}

import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";
import { useAuth } from "./authContext";
import Card from "../component/card/card";

const orderContext = createContext();

export function useOrder() {
  const value = useContext(orderContext);
  return value;
}

export default function CustomOrderContext({ children }) {
  const [order, setorder] = useState([]);
  const { user } = useAuth();

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

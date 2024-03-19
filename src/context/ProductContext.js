import { addDoc, collection } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebase/firebase";

const productContext = createContext();

export function useProduct() {
  const value = useContext(productContext);
  return value;
}

export default function CustomProductContext({ children }) {
  const [product, setProducts] = useState();

  async function getProducts() {
    const p = await getDocs(collection(db, "Product"));
    setProducts(p);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return <productContext.Provider>{children}</productContext.Provider>;
}

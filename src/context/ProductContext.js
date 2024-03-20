import {
  addDoc,
  and,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebase/firebase";

const productContext = createContext();

export function useProduct() {
  const value = useContext(productContext);
  return value;
}

export default function CustomProductContext({ children }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [price, setPrice] = useState(50000);
  const [categories, setCategories] = useState([]);

  async function getProducts() {
    console.log(price);
    const q = query(
      collection(db, "Product"),
      where("price", "<=", Number(price))
    );

    const querySnapshot = await getDocs(q);
    const p = [];
    querySnapshot.forEach((doc) => p.push(doc.data()));
    setProducts(p);
    console.log(p);
  }

  useEffect(() => {
    getProducts();
  }, [price]);

  function handlePrice(p) {
    setPrice(p);
  }

  return (
    <productContext.Provider
      value={{ products, page, setPage, price, handlePrice }}
    >
      {children}
    </productContext.Provider>
  );
}

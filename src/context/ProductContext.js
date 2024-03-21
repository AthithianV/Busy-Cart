import {
  addDoc,
  and,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebase/firebase";
import data from "../data/data.json";

const productContext = createContext();

export function useProduct() {
  const value = useContext(productContext);
  return value;
}

export default function CustomProductContext({ children }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [price, setPrice] = useState(50000);
  const [categories, setCategories] = useState({
    "men's clothing": false,
    "women's clothing": false,
    jewelery: false,
    electronics: false,
  });

  useEffect(() => {
    getProducts();
  }, [price, categories]);

  async function getProducts() {
    // let q = query(
    //   collection(db, "Products"),
    //   where("price", "<=", Number(price))
    // );

    // const keys = Object.keys(categories);
    // const categoriesFilter = keys.filter((k) => categories[k]);
    // if (categoriesFilter.length != 0) {
    //   q = query(
    //     collection(db, "Products"),
    //     where("category", "in", categoriesFilter)
    //   );
    // }

    let q = query(collection(db, "Products"), limit(2));

    const querySnapshot = await getDocs(q);
    const p = [];
    querySnapshot.forEach((doc) => p.push(doc.data()));
    setProducts(p);
    console.log(p);
  }

  function handleCategory(cat) {
    const temp = { ...categories };
    temp[cat] = !temp[cat];
    setCategories(temp);
  }

  function handlePrice(p) {
    setPrice(p);
  }

  return (
    <productContext.Provider
      value={{
        products,
        page,
        setPage,
        setCategories,
        price,
        handlePrice,
        handleCategory,
      }}
    >
      {children}
    </productContext.Provider>
  );
}

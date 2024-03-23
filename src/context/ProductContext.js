// import for firebase
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
import db from "../firebase/firebase";

// import for hooks
import { createContext, useContext, useEffect, useState } from "react";

// Creation of product context.
const productContext = createContext();

// Custom hook for getting states and functions from product context.
export function useProduct() {
  const value = useContext(productContext);
  return value;
}

// Custome product context.
export default function CustomProductContext({ children }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [price, setPrice] = useState(50000);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState({
    "men's clothing": false,
    "women's clothing": false,
    jewelery: false,
    electronics: false,
  });

  // hook to render, the products on changing price and categories states
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProductsWithFilter();
  }, [price, categories]);

  async function getProductsWithFilter() {
    // Query for price.
    let q = query(
      collection(db, "Products"),
      where("price", "<=", Number(price))
    );

    // Query for categories.
    const keys = Object.keys(categories);
    const categoriesFilter = keys.filter((k) => categories[k]);
    if (categoriesFilter.length != 0) {
      q = query(
        collection(db, "Products"),
        where("category", "in", categoriesFilter)
      );
    }

    // getDocs for getting documents using query q.
    const querySnapshot = await getDocs(q);
    const p = [];
    querySnapshot.forEach((doc) =>
      p.push({ productId: doc.id, ...doc.data() })
    );
    setProducts(p);
  }

  // Functions for getting products from db
  async function getProducts() {
    setIsLoading(true);

    // getDocs for getting documents using query q.
    const querySnapshot = await getDocs(collection(db, "Products"));
    const p = [];
    querySnapshot.forEach((doc) =>
      p.push({ productId: doc.id, ...doc.data() })
    );
    setProducts(p);
    setIsLoading(false);
  }

  // Function to handle categories, when user choose a category
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
        isLoading,
      }}
    >
      {children}
    </productContext.Provider>
  );
}

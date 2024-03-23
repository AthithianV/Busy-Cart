import { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import db from "../firebase/firebase";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const cartContext = createContext();

export function useCart() {
  const value = useContext(cartContext);
  return value;
}

export default function CustomCartContext({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardLoader, setCardLaoder] = useState("#");
  const [purchaseLoad, setPurchase] = useState(false);
  const navigate = useNavigate();

  function getCart() {
    if (user) {
      onSnapshot(doc(db, "cart", user), (doc) => {
        const item = doc.data();
        if (item) {
          setCart(item.products);
        }
      });
    }
  }

  useEffect(() => {
    let sum = cart.reduce((acc, p) => acc + Number(p.totalPrice), 0);
    setTotalPrice(sum.toFixed(2));
  }, [cart]);

  useEffect(() => {
    getCart();
  }, []);

  const addToCart = async (product) => {
    setCardLaoder(product.id);
    const index = cart.find((p) => p.id === product.id);
    if (index > -1) {
      return;
    }
    if (user) {
      const docRef = doc(db, "cart", user);
      if (cart.length == 0) {
        await setDoc(docRef, {
          products: [{ ...product, quantity: 1, totalPrice: product.price }],
        });
      } else {
        await updateDoc(docRef, {
          products: arrayUnion({
            ...product,
            quantity: 1,
            totalPrice: product.price,
          }),
        });
      }
      getCart();
      toast.success("Added to Cart");
    } else {
      toast.error("Sign in required");
    }
    setCardLaoder("#");
  };

  async function handleQuantity(product, change) {
    if (product.quantity + change <= 0) {
      return;
    }
    setCardLaoder(product.id);
    const index = cart.findIndex((p) => p.id == product.id);
    if (index > -1) {
      cart[index].quantity = cart[index].quantity + change;
      cart[index].totalPrice = cart[index].quantity * cart[index].price;
      await updateDoc(doc(db, "cart", user), { products: cart });
      getCart();
    }
    setCardLaoder("#");
  }

  const deleteFromCart = async (product) => {
    setCardLaoder(product.id);
    await updateDoc(doc(db, "cart", user), {
      products: arrayRemove(product),
    });
    getCart();
    toast.success("Deleted Item from cart");
    setCardLaoder("#");
  };

  const purchase = async () => {
    setPurchase(true);
    let date = new Date();
    date = date.toISOString().substring(0, 10);
    const timeStamp = Date.now();
    const docRef = doc(db, "Orders", user);
    const item = await getDoc(docRef);
    const order = { [`${timeStamp}`]: { totalPrice, products: cart, date } };
    if (item.data()) {
      await updateDoc(docRef, order, order);
    } else {
      await setDoc(docRef, order, order);
    }

    cart.forEach((c) => {
      deleteFromCart(c);
    });
    navigate("/orders");
    toast.success("Items Purchased");
    setPurchase(false);
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        deleteFromCart,
        handleQuantity,
        purchase,
        purchaseLoad,
        cardLoader,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

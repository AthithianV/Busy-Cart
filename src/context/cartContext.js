// Import for hook
import { createContext, useContext, useEffect, useState } from "react";

// Import for firebase
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

// import from auth context
import { useAuth } from "./authContext";

// Extra imports
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Creation of cart contex.
const cartContext = createContext();

// Custom hook for cart context
export function useCart() {
  const value = useContext(cartContext);
  return value;
}


// Custom context for cart/\.
export default function CustomCartContext({ children }) {

  // states
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardLoader, setCardLaoder] = useState("#");
  const [purchaseLoad, setPurchase] = useState(false);
  const navigate = useNavigate();

  // Function to items from cart.
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

  // hook for getting items on first rendering.
  useEffect(() => {
    let sum = cart.reduce((acc, p) => acc + Number(p.totalPrice), 0);
    setTotalPrice(sum.toFixed(2));
  }, [cart]);

  useEffect(() => {
    getCart();
  }, []);

  // Function to add new product to cart.
  const addToCart = async (product) => {
    setCardLaoder(product.id);

    // first product is checked if product is already in cart
    // if yes return
    const index = cart.find((p) => p.id === product.id);
    if (index > -1) {
      return;
    }

    // Check if user is set and continue.
    if (user) {

      // docRef that pointes to cart doc for the user.
      const docRef = doc(db, "cart", user);

      // if no previous items is present, first product is add.
      if (cart.length == 0) {
        await setDoc(docRef, {
          products: [{ ...product, quantity: 1, totalPrice: product.price }],
        });
      //  if cart already present, the cart is updated with new element.
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

  // Function to handle quantity.
  async function handleQuantity(product, change) {
    if (product.quantity + change <= 0) {
      return;
    }
    setCardLaoder(product.id);

    // Get the index of the product.
    const index = cart.findIndex((p) => p.id == product.id);
    if (index > -1) {
      // update quantity and total price.
      cart[index].quantity = cart[index].quantity + change;
      cart[index].totalPrice = cart[index].quantity * cart[index].price;
      await updateDoc(doc(db, "cart", user), { products: cart });
      getCart();
    }
    setCardLaoder("#");
  }

  // Function to delete item from cart.
  const deleteFromCart = async (product) => {
    setCardLaoder(product.id);
    await updateDoc(doc(db, "cart", user), {
      products: arrayRemove(product),
    });
    getCart();
    toast.success("Deleted Item from cart");
    setCardLaoder("#");
  };

  // Function to handle purchase
  const purchase = async () => {
    setPurchase(true);

    // Date is set.
    let date = new Date();
    date = date.toISOString().substring(0, 10);
    const timeStamp = Date.now();
    const docRef = doc(db, "Orders", user);
    const item = await getDoc(docRef);

    // Obect is made in which date is key,
    // cart is the value.
    const order = { [`${timeStamp}`]: { totalPrice, products: cart, date } };
    
    // The obj is added to database.
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

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartActions } from "./cartReducer";

const getCartAsync = async (user) => {
  const snapshot = await getDoc(doc(db, "Carts", user), doc);
  const cart = snapshot.data().products;
  const totalPrice = snapshot.data().totalPrice;
  return { cart, totalPrice };
};

export const getCart = createAsyncThunk("cart/getCart", async (user) => {
  if (user) {
    // Get cart items using onSnapshot
    return await getCartAsync(user);
  } else {
    return { cart: [], totalPrice: 0 };
  }
});

// Thunk for adding product to cart, function accept user and product.
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ user, product }, thunkApi) => {
    try {
      // check if user is logged in. If not send error
      if (!user) {
        const error = new Error("Sign In required");
        error.code = "unath";
        throw error;
      }

      // Set the loader.
      thunkApi.dispatch(cartActions.setCartLoader(product.id));

      // Get the cart of the user to check if product exists;
      const { cart, totalPrice } = await getCartAsync(user);

      // Check if product already exists in cart.
      const index = cart.findIndex((p) => p.id === product.id);
      if (index > -1) {
        return "exists";
      }

      const newProduct = {
        ...product,
        quantity: 1,
        totalPrice: product.price,
      };

      const docRef = doc(db, "Carts", user);

      //   New product added to cart
      cart.push(newProduct);
      await updateDoc(docRef, {
        products: arrayUnion(newProduct),
        totalPrice: totalPrice + newProduct.price,
      });

      return "not exists";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Handle quantity of product in cart when user increment or decrement the qunatity.
export const quantityHandle = createAsyncThunk(
  "cart/quantity",
  async ({ product, change, user, index }, thunkApi) => {
    try {
      // Check if quantity change to 0, then do not perform the action.
      if (product.quantity + change <= 0) {
        return;
      }

      thunkApi.dispatch(cartActions.setCartLoader(product.id));

      // Get the cart of user.
      let { cart, totalPrice } = await getCartAsync(user);
      totalPrice = totalPrice + change * product.price;

      const docRef = doc(db, "Carts", user);

      // find index of the product and make necessary cahnge in qunatity and price.

      cart[index].quantity = cart[index].quantity + change;
      cart[index].totalPrice = cart[index].quantity * cart[index].price;
      await updateDoc(docRef, {
        products: cart,
        totalPrice,
      });

      return { cart, totalPrice };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Delete product from the cart
export const deleteFromCart = createAsyncThunk(
  "cart/delete",
  async ({ product, user, index }, thunkApi) => {
    try {
      thunkApi.dispatch(cartActions.setCartLoader(product.id));
      let { cart, totalPrice } = await getCartAsync(user);
      totalPrice -= product.price * product.quantity;

      cart.splice(index, 1);

      // Update the cart in database, by removing the product.
      await updateDoc(doc(db, "Carts", user), {
        products: arrayRemove(product),
        totalPrice,
      });

      return { cart, totalPrice };
    } catch (error) {
      throw error;
    }
  }
);

// Purchase function
export const purchase = createAsyncThunk(
  "cart/purchase",
  async ({ user }, thunkApi) => {
    try {
      const { totalPrice, cart } = await getCartAsync(user);
      const date = new Date().toISOString().substring(0, 10);
      const timeStamp = Date.now();
      const newOrder = {
        [`${timeStamp}`]: { totalPrice, products: cart, date },
      };

      const docRef = doc(db, "Orders", user);
      await updateDoc(docRef, { orders: arrayUnion(newOrder) });
      await updateDoc(doc(db, "Carts", user), { products: [], totalPrice: 0 });
      console.log(newOrder);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const cartSelector = (state) => state.cartReducer;

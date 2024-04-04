import { createSlice } from "@reduxjs/toolkit";
import { notifyError } from "../../../Notification/error";
import { notifySuccess } from "../../../Notification/success";
import { toast } from "react-toastify";
import {
  addToCart,
  deleteFromCart,
  getCart,
  purchase,
  quantityHandle,
} from "./cartThunks";

const initialState = {
  cart: [],
  cardLoader: null,
  purchaseLoader: false,
  cartLoader: false,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set cart loader to given product Id.
    setCartLoader: (state, action) => {
      state.cardLoader = action.payload;
    },
    // Find the total price of products that exists in the cart.
    setTotalPrice: (state, action) => {
      state.totalPrice = state.cart.reduce(
        (acc, p) => (acc += p.price * p.quantity),
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // get cart fullifill, cart is set and card loader is set to null
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
        state.cartLoader = false;
      })

      .addCase(getCart.rejected, (state, action) => {
        notifyError(action.error.code);
        state.cartLoader = false;
      })

      .addCase(getCart.pending, (state, action) => {
        state.cartLoader = true;
      })

      // Add to cart fullfilled, new cart is set to state and total price is calculated.
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cardLoader = null;
        if (action.payload == "exists") {
          toast.warning("Item already exists in Cart");
        } else {
          notifySuccess("Added to Cart");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cardLoader = null;
        notifyError(action.error.code);
      })

      // Handle quantity fullfilled cart is updated and total price is calculated and updated
      .addCase(quantityHandle.fulfilled, (state, action) => {
        if (action.payload) {
          state.totalPrice = action.payload.totalPrice;
          state.cart = action.payload.cart;
        }
        state.cardLoader = null;
      })
      .addCase(quantityHandle.rejected, (state, action) => {
        state.cardLoader = null;
        notifyError(action.error.code);
      })

      // deleted fullfilled cart is updated and total price is calculated and updated
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.cardLoader = null;
        notifyError(action.error.code);
      })

      // Purchase fullfill
      .addCase(purchase.fulfilled, (state, action) => {
        state.purchaseLoader = false;
        notifySuccess("Products Purchased Successfully");
      })
      .addCase(purchase.pending, (state, action) => {
        state.purchaseLoader = true;
      })
      .addCase(purchase.rejected, (state, action) => {
        notifyError(action.error.code);
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

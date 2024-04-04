import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { notifyError } from "../../../Notification/error";
import db from "../../../firebase/firebase";

const initialState = {
  orders: [],
  orderLoader: false,
};

export const getOrders = createAsyncThunk("order/get", async ({ user }) => {
  try {
    const snapshot = await getDoc(doc(db, "Orders", user));
    const orders = Array.from(snapshot.data().orders);

    return orders;
  } catch (error) {
    throw error;
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.orderLoader = false;
      })
      .addCase(getOrders.pending, (state, action) => {
        state.orderLoader = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.orderLoader = false;
        notifyError(action.error.code);
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderSelector = (state) => state.orderReducer;

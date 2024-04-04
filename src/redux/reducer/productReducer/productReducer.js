import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../../firebase/firebase";
import { notifyError } from "../../../Notification/error";

// Initial State.
const initialState = {
  products: [],
  price: 0,
  searchKey: "",
  categories: {
    "men's clothing": false,
    "women's clothing": false,
    jewelery: false,
    electronics: false,
  },
  isLoading: false,
};

export const getProducts = createAsyncThunk("products/get", async () => {
  const querySnapshot = await getDocs(collection(db, "Products"));
  const p = [];
  querySnapshot.forEach((doc) => p.push({ productId: doc.id, ...doc.data() }));
  return p;
});

export const getProductsWithFilter = createAsyncThunk(
  "products/getWithFilter",
  async ({ categories, price, searchKey }) => {
    let q = query(collection(db, "Products"));

    if (price) {
      q = query(
        collection(db, "Products"),
        where("price", "<=", Number(price))
      );
    }

    // Query for categories.
    const keys = Object.keys(categories);
    const categoriesFilter = keys.filter((k) => categories[k]);
    if (categoriesFilter.length !== 0) {
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
    return p;
  }
);

const handleLoading = (state, action) => {
  state.isLoading = true;
};

// When promises are rejected.
const handleError = (state, action) => {
  state.isLoading = false;
  notifyError(action.error.code);
};

// Product slice.
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Reducer for setting categoies
    setCategory: (state, action) => {
      state.categories[action.payload] = !state.categories[action.payload];
    },
    // Reducer for setting price
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.pending, handleLoading)
      .addCase(getProducts.rejected, handleError)
      .addCase(getProductsWithFilter.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductsWithFilter.pending, handleLoading)
      .addCase(getProductsWithFilter.rejected, handleError);
  },
});

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const productSelector = (state) => state.productReducer;

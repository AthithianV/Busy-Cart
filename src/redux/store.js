import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer/userReducer";
import { productReducer } from "./reducer/productReducer/productReducer";
import { cartReducer } from "./reducer/cartReducer/cartReducer";
import { orderReducer } from "./reducer/orderReducer/orderReducer";

const store = configureStore({
  reducer: { userReducer, productReducer, cartReducer, orderReducer },
});
export default store;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";
import {thunk} from "redux-thunk";


const store = configureStore({
  reducer: {
    cart: cartReducer, // Aquí puedes agregar más reducers en el futuro
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Agregar thunk como middleware
  devTools: process.env.NODE_ENV !== "production", // DevTools solo en desarrollo
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./slices/cartSlice";

// import {thunk} from "redux-thunk";


// const store = configureStore({
//   reducer: {
//     cart: cartReducer, // Aquí puedes agregar más reducers en el futuro
//     products: productsReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Agregar thunk como middleware
//   devTools: process.env.NODE_ENV !== "production", // DevTools solo en desarrollo
// });

// export default store;


//REDUX / store.js



import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice"; // Reducer de productos
import cartReducer from "./slices/cartSlice"; // Reducer de carrito

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },

  devTools: process.env.NODE_ENV !== "production", // Habilitar devTools solo en desarrollo
});

export default store;

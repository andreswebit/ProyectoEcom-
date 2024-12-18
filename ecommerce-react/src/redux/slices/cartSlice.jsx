import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Lista de productos en el carrito
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload); // Agrega el producto al carrito
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload); // Elimina un producto del carrito
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

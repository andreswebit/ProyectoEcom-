
////////////////REDUX/SLICES.JSX////////////////////////////////
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Productos en el carrito
  totalAmount: 0, // Monto total
  totalQuantity: 0, // Cantidad total de productos
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
        state.totalQuantity++;
        state.totalAmount += newItem.price;
      } else {
        existingItem.quantity++;
        state.totalAmount += existingItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

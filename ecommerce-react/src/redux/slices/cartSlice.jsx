// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [], // Lista de productos en el carrito
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       state.items.push(action.payload); // Agrega el producto al carrito
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload); // Elimina un producto del carrito
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;

////////////////////////////REDUX/SLICES/CARTSLICE.JSX//////////////////////////////



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   item: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const product = action.payload;
//       const existingProduct = state.item.find((item) => item.id === product.id);

//       if (existingProduct) {
//         // Si el producto ya está en el carrito, se incrementa la cantidad
//         if (existingProduct.stock > existingProduct.quantity) {
//           existingProduct.quantity += 1;
//           // Actualiza el stock en el carrito y en los productos disponibles
//           product.stock -= 1;
//         }
//       } else {
//         // Si el producto no está en el carrito, se agrega con cantidad 1
//         state.item.push({ ...product, quantity: 1 });
//         product.stock -= 1; // Reducir el stock en el producto original
//       }
//     },
//     removeFromCart: (state, action) => {
//       const id = action.payload;
//       const productIndex = state.item.findIndex((item) => item.id === id);
//       if (productIndex !== -1) {
//         state.item.splice(productIndex, 1);
//       }
//     },
//     updateStock: (state, action) => {
//       const { productId, quantity } = action.payload;
//       const product = state.item.find(item => item.id === productId);
//       if (product) {
//         product.stock += quantity; // Actualizar el stock de un producto
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateStock } = cartSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

// Estado inicial con item como un arreglo vacío
const initialState = {
  item: [], // Aseguramos que el carrito comienza como un arreglo vacío
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = { ...action.payload }; // Crear una copia del producto
      const existingProduct = state.item.find((item) => item.id === product.id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, se incrementa la cantidad
        if (existingProduct.stock > existingProduct.quantity) {
          existingProduct.quantity += 1;
          existingProduct.stock -= 1; // Reducir el stock en el producto
        }
      } else {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        state.item.push({ ...product, quantity: 1 });
        product.stock -= 1; // Reducir el stock en el producto original
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const productIndex = state.item.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        state.item.splice(productIndex, 1);
      }
    },
    updateStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.item.find(item => item.id === productId);
      if (product) {
        product.stock += quantity; // Actualizar el stock de un producto
      }
    },
  },
});

export const { addToCart, removeFromCart, updateStock } = cartSlice.actions;

export default cartSlice.reducer;


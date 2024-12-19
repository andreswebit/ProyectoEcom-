// En productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción asincrónica para obtener productos (por ejemplo, de una API)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products"); // API de productos fake
    const data = await response.json();

    // Obtener solo los primeros 5 productos
    const firstFiveProducts = data.slice(0, 5);

    // Simular el stock de los productos
    return firstFiveProducts.map((product) => ({
      ...product,
      stock: Math.floor(Math.random() * 10) + 1, // Genera un stock aleatorio entre 1 y 10
      quantity: 0, // Establece la cantidad inicial en 0
    }));
  }
);

const initialState = {
  products: [
    // Productos cargados manualmente
    { id: 1, title: "Filtro de aceite", price: 50, stock: 10, quantity: 0 },
    { id: 2, title: "Bujías Toyota", price: 25, stock: 15, quantity: 0 },
    { id: 3, title: "Pastillas de freno", price: 70, stock: 12, quantity: 0 },
    { id: 4, title: "Amortiguadores", price: 120, stock: 5, quantity: 0 },
    { id: 5, title: "Bateria Toyota", price: 150, stock: 8, quantity: 0 },
  ],
  status: "idle", // Estado de carga (loading, error, etc.)
};

// const initialState = {
//   products: [], // Aquí van los productos cargados manualmente
//   status: "idle", // Estado de carga (loading, error, etc.)
// };
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload); // Agregar productos manualmente
    },
    setProducts: (state, action) => {
      state.products = action.payload; // Establecer productos si es necesario
    },
    updateProductStock: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.stock += action.payload.quantity; // Actualizar el stock de un producto
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [
          ...state.products, // Productos manuales
          ...action.payload,  // Productos cargados desde la API
        ];
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addProduct, setProducts, updateProductStock } = productsSlice.actions;

export default productsSlice.reducer;

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     addProduct: (state, action) => {
//       state.products.push(action.payload); // Agregar productos manualmente
//     },
//     setProducts: (state, action) => {
//       state.products = action.payload; // Establecer productos (si se necesita)
//     },
//     updateProductStock: (state, action) => {
//       const product = state.products.find(
//         (product) => product.id === action.payload.id
//       );
//       if (product) {
//         product.stock += action.payload.quantity; // Actualizar el stock de un producto
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Fusionamos los productos de la API con los manuales, asegurándonos de no reemplazar los productos manuales
//         state.products = [
//           ...state.products,
//           ...action.payload.filter(
//             (apiProduct) =>
//               !state.products.some((manualProduct) => manualProduct.id === apiProduct.id)
//           ), // Evitar duplicados
//         ];
//       })
//       .addCase(fetchProducts.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// export const { addProduct, setProducts, updateProductStock } = productsSlice.actions;

// export default productsSlice.reducer;




// // redux/slices/productsSlice.js


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Acción asincrónica para obtener productos (por ejemplo, de una API)
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const response = await fetch("https://fakestoreapi.com/products"); // Aquí puedes cambiar la URL a la de tu API
//     return response.json();
//   }
// );

// const initialState = {
//   products: [],
//   status: "idle", // Puedes agregar un estado para manejar el proceso de carga (loading, error, etc.)
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     addProduct: (state, action) => {
//       state.products.push(action.payload);
//     },
//     setProducts: (state, action) => {
//       state.products = action.payload;
//     },
//     // Acción para actualizar el stock de un producto
//     updateProductStock: (state, action) => {
//       const product = state.products.find(
//         (product) => product.id === action.payload.id
//       );
//       if (product) {
//         product.stock += action.payload.quantity; // Sumar la cantidad al stock existente
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// export const { addProduct, setProducts ,updateProductStock} = productsSlice.actions;

// export default productsSlice.reducer;

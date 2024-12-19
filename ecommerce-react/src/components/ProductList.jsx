// import Producto from "./Producto";

// const ProductList = ({ productos }) => {
//   if (!productos || productos.length === 0) {
//     return <p>No hay productos disponibles.</p>;
//   }

//   return (
//     <div>
//       <h2>Lista de Productos</h2>
//       <ul>
//         {productos.map((producto) => (
//           <li key={producto.id}>
//             <Producto producto={producto} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;

///////////////////////consigna 13 //////////////////

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Producto from "./Producto";

// const ProductList = () => {
//   const [productos, setProductos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProductos = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         setProductos(
//           response.data.map((producto) => ({
//             ...producto,
//             stock: Math.floor(Math.random() * 10) + 1, // Agregar un stock ficticio
//           }))
//         );
//       } catch (error) {
//         console.error("Error al obtener los productos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductos();
//   }, []);

//   if (loading) {
//     return <p>Cargando productos...</p>;
//   }

//   if (productos.length === 0) {
//     return <p>No hay productos disponibles.</p>;
//   }

//   return (
//     <div>
//       <h2>Lista de Productos</h2>
//       <ul>
//         {productos.map((producto) => (
//           <li key={producto.id}>
//             <Producto producto={producto} />
//           </li>
//         ))}
//       </ul>
//     </div>

//   );
// };

// export default ProductList;

//////////////////////////////para poner como tabla ///////////////////////////////// en la ruta productos
// <div className="App-content">
//   {" "}
//   <h1>Listado de Productos</h1>{" "}
//   <table>
//     {" "}
//     <thead>
//       {" "}
//       <tr>
//         {" "}
//         <th>ID</th> <th>Nombre</th> <th>Precio</th> <th>Stock</th>{" "}
//       </tr>{" "}
//     </thead>{" "}
//     <tbody>
//       {" "}
//       {productos.map((producto) => (
//         <tr key={producto.id}>
//           {" "}
//           <td>{producto.id}</td> <td>{producto.title}</td>{" "}
//           <td>{producto.price}</td> <td>{producto.stock}</td>{" "}
//           {/* Asegúrate de que 'stock' exista en tus datos */}{" "}
//         </tr>
//       ))}{" "}
//     </tbody>{" "}
//   </table>{" "}
// </div>

///////////////////////consigna 14 //////////////////

//     import React from "react";
// import Producto from "./Producto";
// import useFetch from "../hooks/useFetch";
// // import { useCart } from "../components/CartContext";

// const ProductList = () => {
//   const { data: productos, loading, error  } = useFetch("https://fakestoreapi.com/products");
//   const { addToCart } = useCart();

//   if (loading) return <p>Cargando productos...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Lista de Productos</h2>
//       <ul>
//         {productos.map((producto) => (
//           <li key={producto.id}>
//             <Producto producto={producto} addToCart={addToCart} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;
//////////////////////////////////redux////////////consig 15 //////////////////

// ////////////////////////////PRODUCTLIST.JSX////////////////////
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/productsSlice";
// import { addToCart } from "../redux/slices/cartSlice";

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products);
//   const status = useSelector((state) => state.products.status);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, status]);

//   const handleAddToCart = (product) => {
//     if (product.stock > 0) {
//       dispatch(addToCart(product)); // Agregar producto al carrito
//     }

//   };

//   return (
//     <div>
//       <h2>Lista de Productos</h2>
//       {status === "loading" && <p>Cargando...</p>}
//       {status === "failed" && <p>Error al cargar los productos</p>}

//       <table>
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Precio</th>
//             <th>Stock</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={index}>
//               <td>{product.title}</td>
//               <td>{product.price}</td>
//               <td>{product.stock}</td> {/* Mostrar stock */}
//               <td>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={product.stock === 0} // Deshabilitar si el stock es 0
//                 >

//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/productsSlice";
// import { addToCart } from "../redux/slices/cartSlice";

// const ProductList = () => {
//     const dispatch = useDispatch();
//     const products = useSelector((state) => state.products.products);
//     const status = useSelector((state) => state.products.status);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         if (status === "idle") {
//             dispatch(fetchProducts());
//         }
//     }, [dispatch, status]);

//     const handleAddToCart = (product) => {
//         if (product.stock > 0) {
//             dispatch(addToCart(product));
//             setMessage("Producto agregado correctamente");
//             setTimeout(() => setMessage(""), 2000);
//         }
//     };

//     return (
//         <div>
//             <h2>Lista de Productos</h2>
//             {status === "loading" && <p>Cargando...</p>}
//             {status === "failed" && <p>Error al cargar los productos</p>}
//             {message && <p className="mensaje">{message}</p>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Nombre</th>
//                         <th>Precio</th>
//                         <th>Stock</th>
//                         <th>Acciones</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map((product) => (
//                         <tr key={product.id}>
//                             <td>{product.title}</td>
//                             <td>${product.price.toFixed(2)}</td>
//                             <td>{product.stock}</td>
//                             <td>
//                                 <button
//                                     onClick={() => handleAddToCart(product)}
//                                     disabled={product.stock === 0}
//                                 >
//                                     Agregar al carrito
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ProductList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/productsSlice";
// import { addToCart } from "../redux/slices/cartSlice";

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products);
//   const status = useSelector((state) => state.products.status);
//   const [message, setMessage] = useState("");

//   // Llamar a la acción fetchProducts solo si el estado es 'idle'
//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, status]);

//   const handleAddToCart = (product) => {
//     if (product.stock > 0) {
//       dispatch(addToCart(product));
//       setMessage("Producto agregado correctamente");
//       setTimeout(() => setMessage(""), 2000); // Limpiar mensaje después de 2 segundos
//     }
//   };

//   return (
//     <div className="product-list">
//       <h2>Lista de Productos</h2>
//       {status === "loading" && <p>Cargando...</p>}
//       {status === "failed" && <p>Error al cargar los productos</p>}
//       {message && <p className="mensaje">{message}</p>}

//       <table className="product-list-table">
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Precio</th>
//             <th>Stock</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 {product.title || product.name || "Producto no disponible"}
//               </td>
//               <td>${product.price.toFixed(2)}</td>
//               <td>{product.stock}</td>
//               <td>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={product.stock === 0}
//                   className="add-to-cart-btn"
//                 >
//                   Agregar al carrito
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;


// En ProductList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import { addToCart } from "../redux/slices/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); // Productos cargados
  const status = useSelector((state) => state.products.status); // Estado de carga
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts()); // Despachamos para cargar productos
    }
  }, [dispatch, status]);

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      dispatch(addToCart(product)); // Agregar producto al carrito
      setMessage("Producto agregado correctamente");
      setTimeout(() => setMessage(""), 2000); // Mensaje temporal
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      {status === "loading" && <p>Cargando...</p>}
      {status === "failed" && <p>Error al cargar los productos</p>}
      {message && <p>{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title || product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0} // Deshabilitar si no hay stock
                >
                  {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

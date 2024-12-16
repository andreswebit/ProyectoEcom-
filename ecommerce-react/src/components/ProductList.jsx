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

    import React from "react";
import Producto from "./Producto";
import useFetch from "../hooks/useFetch";
import { useCart } from "../components/CartContext";

const ProductList = () => {
  const { data: productos, loading, error  } = useFetch("https://fakestoreapi.com/products");
  const { addToCart } = useCart();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <Producto producto={producto} addToCart={addToCart} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

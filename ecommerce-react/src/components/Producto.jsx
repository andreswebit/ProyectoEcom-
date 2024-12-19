// import React, { useState } from "react";

// const Producto = ({ producto }) => {
//   const [mostrarDetalles, setMostrarDetalles] = useState(false);

//   const toggleDetalles = () => {
//     setMostrarDetalles(!mostrarDetalles);
//   };

//   return (
//     <div>
//       <p onClick={toggleDetalles} style={{ cursor: "pointer", color: "blue" }}>
//         {producto.title}
//       </p>
//       {mostrarDetalles && (
//         <div>
//           <p>Precio: ${producto.price}</p>
//           <p>Stock: {producto.stock || "No disponible"}</p>
//           {producto.user && <p>Vendido por: {producto.user.name}</p>}
//         </div>

//       )}
//     </div>
//   );
// };

// export default Producto;

//////////////////////////////consigna 14 /////////////////////////////

// import React from "react";

// const Producto = ({ producto, addToCart }) => {
//   return (
//     <div>
//       <p style={{ cursor: "pointer", color: "blue" }}>{producto.title}</p>
//       <p>Precio: ${producto.price}</p>
//       <p>Stock: {producto.stock || "No disponible"}</p>
//       <button onClick={() => addToCart(producto)}>Añadir al carrito</button>
//     </div>
//   );
// };

// export default Producto;

//////////////////////////////consigna 15 redux /////////////////////////////

// import React from "react";
// import { useDispatch} from "react-redux"; // Hook de Redux para enviar acciones
// import { addToCart } from "../redux/slices/cartSlice"; // Acción para añadir productos al carrito

// const Producto = ({ producto }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addToCart(producto)); // Envía la acción para agregar el producto al carrito
//   };

//   return (
//     <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//       <p style={{ cursor: "pointer", color: "blue", fontWeight: "bold" }}>
//         {producto.title}
//       </p>
//       <p>Precio: ${producto.price}</p>
//       <p>Stock: {producto.stock || "No disponible"}</p>
//       <button
//         onClick={handleAddToCart}
//         style={{
//           backgroundColor: "green",
//           color: "white",
//           border: "none",
//           padding: "5px 10px",
//           cursor: "pointer",
//         }}
//       >
//         Añadir al carrito
//       </button>
//     </div>
//   );
// };

// export default Producto;

//////////////////////PRODUCTO.JSX///////////////////////

import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Hook de Redux para enviar acciones
import { addToCart } from "../redux/slices/cartSlice"; // Acción para añadir productos al carrito

const Producto = ({ producto }) => {
  const dispatch = useDispatch();
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje dinámico

  const handleAddToCart = () => {
    dispatch(addToCart(producto)); // Envía la acción para agregar el producto al carrito
    setMensaje("Producto agregado correctamente"); // Mensaje temporal
    setTimeout(() => setMensaje(""), 2000); // Limpia el mensaje después de 2 segundos
  };

  return (
    <div className="producto-container">
      <p className="producto-title">{producto.title}</p>
      <p>Precio: ${producto.price}</p>
      <p>Stock: {producto.stock || "No disponible"}</p>
      <button className="btn agregar" onClick={handleAddToCart}>
        Añadir al carrito
      </button>
      {/* Mostrar mensaje temporal */}
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default Producto;

// import React from "react";
// import { useCart } from "../components/CartContext";

// const Cart = () => {
//   const { cart, removeFromCart } = useCart();

//   if (cart.length === 0) {
//     return <p>El carrito está vacío</p>;
//   }

//   return (
//     <div>
//       <h2>Carrito de Compras</h2>
//       <ul>
//         {cart.map((item) => (
//           <li key={item.id}>
//             <p>{item.title}</p>
//             <p>Precio: ${item.price}</p>
//             <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Cart;
// ////////////////////////////////consigna 15 //////////////////
// import React from "react";
// import { useSelector, useDispatch } from "react-redux"; // Hooks de Redux

// // Acción para eliminar productos del carrito
// import { removeFromCart } from "../redux/slices/cartSlice";

// const Cart = () => {
//   const cart = useSelector((state) => state.cart.items); // Obtén los productos del carrito desde la store
//   const dispatch = useDispatch();

//   if (cart.length === 0) {
//     return <p>El carrito está vacío</p>;
//   }

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart({ id })); // Envía la acción para eliminar el producto del carrito
//   };

//   return (
//     <div>
//       <h2>Carrito de Compras</h2>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {cart.map((item) => (
//           <li
//             key={item.id}
//             style={{
//               borderBottom: "1px solid #ccc",
//               marginBottom: "10px",
//               paddingBottom: "10px",
//             }}
//           >
//             <p>
//               <strong>{item.title}</strong>
//             </p>
//             <p>Precio: ${item.price}</p>
//             <button
//               onClick={() => handleRemoveFromCart(item.id)}
//               style={{
//                 backgroundColor: "red",
//                 color: "white",
//                 border: "none",
//                 padding: "5px 10px",
//                 cursor: "pointer",
//               }}
//             >
//               Eliminar
//             </button>
//           </li>
//         ))}
//       </ul>
//       <p>
//         <strong>Total:</strong> $
//         {cart.reduce((acc, item) => acc + item.price, 0)}
//       </p>
//     </div>
//   );
// };

// export default Cart;

///////////////////////

import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Hooks de Redux
import { removeFromCart } from "../redux/slices/cartSlice"; // Acción para eliminar productos del carrito

const Cart = () => {
  const cart = useSelector((state) => state.cart.items); // Obtén los productos del carrito desde la store
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id })); // Envía la acción para eliminar el producto del carrito
  };

  if (cart.length === 0) {
    return <p className="cart-empty">El carrito está vacío</p>;
  }

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <p className="cart-item-title">{item.title}</p>
            <p>Precio: ${item.price}</p>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="btn eliminar"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-total">
        <strong>Total:</strong> $
        {cart.reduce((acc, item) => acc + item.price, 0)}
      </p>
    </div>
  );
};

export default Cart;

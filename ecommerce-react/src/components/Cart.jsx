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

/////////////////////// CART. JSX/////////////


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart.item);


  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Calcular el total
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  // Formatear el total como moneda
  const formattedTotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(total);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">El carrito está vacío</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index}>
                <td>{product.title || product.name}</td>
                <td>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}</td>
                <td>{product.quantity}</td>
                <td>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price * product.quantity)}</td>
                <td>
                  <button 
                    className="remove-button" 
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 className="cart-total">Total: {formattedTotal}</h3>
      {cart.length > 0 && (
        <button
          className="checkout-button"
          onClick={() => window.open("https://www.visa.com.ar", "_blank")}
        >
          Finalizar Compra
        </button>
      )}
    </div>
  );
};

export default Cart;

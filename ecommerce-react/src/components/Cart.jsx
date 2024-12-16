import React from "react";
import { useCart } from "../components/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p>El carrito está vacío</p>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>Precio: ${item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

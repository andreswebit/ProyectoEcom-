import React, { useState } from "react";

const Producto = ({ producto }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  const toggleDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  return (
    <div>
      <p onClick={toggleDetalles} style={{ cursor: "pointer", color: "blue" }}>
        {producto.title}
      </p>
      {mostrarDetalles && (
        <div>
          <p>Precio: ${producto.price}</p>
          <p>Stock: {producto.stock || "No disponible"}</p>
          {producto.user && <p>Vendido por: {producto.user.name}</p>}
        </div>
        
      )}
    </div>
  );
};

export default Producto;




import React, { useState } from "react";

const Usuario = (props) => {
  const { usuario } = props; // Destructura `usuario` de las props para obtener las patrtes
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  const toggleDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  return (
    <div>
      <p
        onClick={toggleDetalles}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {usuario.name}
      </p>
      {mostrarDetalles && (
        <div>
          <p>Email: {usuario.email}</p>
          <p>Teléfono: {usuario.phone}</p>
          {usuario.company && <p>Compañía: {usuario.company.name}</p>}
        </div>
      )}
    </div>
  );
};

export default Usuario;

import React from "react";
import Usuario from "./Usuario";

const Usuarios = ({ usuarios }) => {
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <Usuario usuario={usuario} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;

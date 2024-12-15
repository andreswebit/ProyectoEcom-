// import React from "react";
// import Usuario from "./Usuario";

// const Usuarios = ({ usuarios }) => {
//   if (!usuarios || usuarios.length === 0) {
//     return <p>No hay usuarios disponibles.</p>;
//   }

//   return (
//     <div>
//       <h2>Lista de Usuarios</h2>
//       <ul>
//         {usuarios.map((usuario) => (
//           <li key={usuario.id}>
//             <Usuario usuario={usuario} />
//             </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Usuarios;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Usuario from "./Usuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (usuarios.length === 0) {
    return <p>No hay usuarios disponibles.</p>;
  }

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


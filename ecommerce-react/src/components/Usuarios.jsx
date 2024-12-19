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
    // </div>
//   );
// };

// export default Usuarios;


////////////USUARIOS.JSX//////////////////////
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Usuario from "./Usuario";
// import FormUser from "./FormUser";

// const Usuarios = () => {
//   const [usuarios, setUsuarios] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsuarios = async () => {
//       try {
//         const response = await axios.get(
//           "https://jsonplaceholder.typicode.com/users"
//         );
//         setUsuarios(response.data);
//       } catch (error) {
//         console.error("Error al obtener los usuarios:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsuarios();
//   }, []);

//   if (loading) {
//     return <p>Cargando usuarios...</p>;
//   }

//   if (usuarios.length === 0) {
//     return <p>No hay usuarios disponibles.</p>;
//   }

//   return (
//     <div>
//       <h2>Lista de Usuarios</h2>
//       <ul>
//         {usuarios.map((usuario) => (
//           <li key={usuario.id}>
//             <Usuario usuario={usuario} />
//           </li>
//         ))}
//       </ul>
//       {/* Mostrar los usuarios guardados */}
//       <h3 className="form-user__user-list-title">Usuarios Registrados</h3>
//             <ul className="form-user__user-list">
//                 {users.map((user, index) => (
//                     <li key={index} className="form-user__user-item">
//                         {user.nombre} - {user.email} - {user.tipo}
//                     </li>
//                 ))}
//             </ul>
//     </div>
//   );
// };

// export default Usuarios;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Usuario from "./Usuario";
// import FormUser from "./FormUser"; // Importar FormUser

// const Usuarios = () => {
//   const [usuarios, setUsuarios] = useState([]);  // Lista completa de usuarios
//   const [loading, setLoading] = useState(true);

//   // Función para agregar un nuevo usuario
//   const addUser = (newUser) => {
//     setUsuarios((prevUsers) => {
//       const updatedUsers = [...prevUsers];
//       if (updatedUsers.length >= 5) {
//         updatedUsers.shift();  // Elimina el primer usuario si hay más de 5
//       }
//       updatedUsers.push(newUser);
//       return updatedUsers;
//     });
//   };

//   // Cargar usuarios desde la API
//   useEffect(() => {
//     const fetchUsuarios = async () => {
//       try {
//         const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//         const fakeUsers = response.data.slice(0, 5); // Solo toma los primeros 5 usuarios
//         setUsuarios(fakeUsers);
//       } catch (error) {
//         console.error("Error al obtener los usuarios:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsuarios();
//   }, []);

//   if (loading) {
//     return <p>Cargando usuarios...</p>;
//   }

//   return (
//     <div>
//       <h2>Lista de Usuarios</h2>
//       <ul>
//         {usuarios.map((usuario) => (
//           <li key={usuario.id}>
//             <Usuario usuario={usuario} />
//           </li>
//         ))}
//       </ul>

//       {/* Pasa la función addUser como prop a FormUser */}
//       <FormUser onAddUser={addUser} />
//     </div>
//   );
// };

// export default Usuarios;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Usuario from "./Usuario";
// import { useDispatch } from "react-redux";
// import { addUser } from "../redux/actions"; // Importar la acción para agregar usuario
// import FormUser from "./FormUser"; // Importar el componente FormUser

// const Usuarios = () => {
//   const [usuarios, setUsuarios] = useState([]);  // Lista completa de usuarios
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();  // Usar dispatch de Redux

//   // Cargar usuarios desde la API
//   useEffect(() => {
//     const fetchUsuarios = async () => {
//       try {
//         const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//         const fakeUsers = response.data.slice(0, 5); // Solo toma los primeros 5 usuarios
//         setUsuarios(fakeUsers);
//         // Aquí puedes agregar usuarios a la store si es necesario
//         fakeUsers.forEach(user => dispatch(addUser(user)));
//       } catch (error) {
//         console.error("Error al obtener los usuarios:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsuarios();
//   }, [dispatch]);

//   const handleAddUser = (newUser) => {
//     setUsuarios((prevUsers) => [...prevUsers, newUser]); // Añadir el nuevo usuario a la lista
//   };

//   if (loading) {
//     return <p>Cargando usuarios...</p>;
//   }

//   return (
//     <div>
//       <h2>Lista de Usuarios</h2>
//       <ul>
//         {usuarios.map((usuario) => (
//           <li key={usuario.id}>
//             <Usuario usuario={usuario} />
//           </li>
//         ))}
//       </ul>
//       <FormUser onAddUser={handleAddUser} /> {/* Pasar la función handleAddUser como prop */}
//     </div>
//   );
// };

// export default Usuarios;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Usuario from "./Usuario";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions"; // Importar la acción para agregar usuario
//import FormUser from "./FormUser"; // Importar el componente FormUser

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);  // Lista completa de usuarios
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();  // Usar dispatch de Redux

  // Cargar usuarios desde la API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const fakeUsers = response.data.slice(0, 5); // Solo toma los primeros 5 usuarios
        setUsuarios(fakeUsers);
        // Aquí puedes agregar usuarios a la store si es necesario
        fakeUsers.forEach(user => dispatch(addUser(user)));
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [dispatch]);

  // Función para agregar un nuevo usuario
  // const handleAddUser = (newUser) => {
  //   setUsuarios((prevUsers) => [...prevUsers, newUser]); // Añadir el nuevo usuario a la lista
  // };

  if (loading) {
    return <p>Cargando usuarios...</p>;
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
       {/* Pasar la función handleAddUser como prop */}
    </div>
  );
};

export default Usuarios;

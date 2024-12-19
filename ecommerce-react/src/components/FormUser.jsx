//////////////////FORMUSER.JSX////////////////

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function validate({ email }) {
//   const error = {};
//   if (email && !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email)) {
//     error.email = "El formato debe de ser de email";
//   }
//   return error;
// }

// export default function FormUsuario() {
//   const [error, setError] = useState({});
//   const [input, setInput] = useState({
//     nombre: "",
//     email: "",
//     rango: 0,
//     fecha: "",
//     seleccionar: "",
//   });

//   const handleInput = (e) => {
//     const clave = e.target.name;
//     const valor = e.target.value;
//     setInput({
//       ...input,
//       [clave]: valor,
//     });
//     setError(
//       validate({
//         ...input,
//         [clave]: valor,
//       })
//     );
//   };

//   const [radio, setRadio] = useState("");
//   const handleChange = (e) => {
//     setRadio(e.target.value);
//   };

//   const [checkboxes, setCheckboxes] = useState({
//     A: false,
//     B: false,
//     C: false,
//   });
//   const handleCheck = (e) => {
//     setCheckboxes({
//       ...checkboxes,
//       [e.target.name]: e.target.checked,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(input, radio, checkboxes);
//   };

//   return (
//     <>
//       <Link to="/">Volver</Link>
//       <h2>Formulario de Usuario</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           id="nombre"
//           name="nombre"
//           value={input.nombre}
//           onChange={handleInput}
//           type="text"
//           placeholder="nombre"
//         />
//         <br />
//         <input
//           id="email"
//           name="email"
//           value={input.email}
//           type="email"
//           placeholder="email"
//           onChange={handleInput}
//         />
//         {error.email && <span>{error.email}</span>}
//         <br />
//         <label htmlFor="rango">rango: </label>
//         <input
//           type="range"
//           id="rango"
//           name="rango"
//           value={input.rango}
//           onChange={handleInput}
//         />
//         <br />
//         <input
//           type="radio"
//           id="uno"
//           name="opcion"
//           value="uno"
//           onChange={handleChange}
//           checked={radio === "uno"}
//         />
//         <label htmlFor="uno">Uno</label>
//         <input
//           type="radio"
//           id="dos"
//           name="opcion"
//           value="dos"
//           onChange={handleChange}
//           checked={radio === "dos"}
//         />
//         <label htmlFor="dos">Dos</label>
//         <input
//           type="radio"
//           id="tres"
//           name="opcion"
//           value="tres"
//           onChange={handleChange}
//           checked={radio === "tres"}
//         />
//         <label htmlFor="tres">Tres</label>
//         <br />
//         <input
//           type="checkbox"
//           id="A"
//           name="A"
//           checked={checkboxes.A}
//           onChange={handleCheck}
//         />
//         <label htmlFor="A">A</label>
//         <input
//           type="checkbox"
//           id="B"
//           name="B"
//           checked={checkboxes.B}
//           onChange={handleCheck}
//         />
//         <label htmlFor="B">B</label>
//         <input
//           type="checkbox"
//           id="C"
//           name="C"
//           checked={checkboxes.C}
//           onChange={handleCheck}
//         />
//         <label htmlFor="C">C</label>
//         <br />
//         <label htmlFor="fecha">Fecha: </label>
//         <input
//           type="date"
//           id="fecha"
//           name="fecha"
//           value={input.fecha}
//           onChange={handleInput}
//         />
//         <br />
//         <label>
//           Seleccionar:
//           <select
//             name="seleccionar"
//             value={input.seleccionar}
//             onChange={handleInput}
//           >
//             <option value="">---</option>
//             <option value="opcion1">Opción 1</option>
//             <option value="opcion2">Opción 2</option>
//             <option value="opcion3">Opción 3</option>
//           </select>
//         </label>
//         <br />
//         <button type="submit">Enviar</button>
//       </form>
//     </>
//   );
// }
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FormUser({ onAddUser }) {
  const [input, setInput] = useState({
    nombre: "",
    email: "",
    direccion: "",
    tipo: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !input.nombre ||
      !input.email ||
      !input.direccion ||
      !input.tipo ||
      !input.password
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const newUser = {
      id: Math.floor(Math.random() * 1000), // Asignando un ID temporal
      ...input,
    };

    // Llamar a la función onAddUser para agregar el nuevo usuario a la lista
    if (typeof onAddUser === "function") {
      onAddUser(newUser); // Verifica si onAddUser es una función antes de llamarla
    } else {
      console.error("onAddUser no es una función.");
    }

    // Limpiar los campos del formulario
    setInput({
      nombre: "",
      email: "",
      direccion: "",
      tipo: "",
      password: "",
    });

    setSuccessMessage(`Usuario ${input.nombre} registrado con éxito.`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <>
      <Link to="/" className="form-user__back-link">
        Volver
      </Link>
      <h2 className="form-user__title">Formulario de Usuario</h2>
      <form onSubmit={handleSubmit} className="form-user__form">
        <input
          name="nombre"
          value={input.nombre}
          onChange={handleInput}
          type="text"
          placeholder="Nombre"
          className="form-user__input"
        />
        <input
          name="email"
          value={input.email}
          type="email"
          placeholder="Email"
          onChange={handleInput}
          className="form-user__input"
        />
        <input
          name="direccion"
          value={input.direccion}
          type="text"
          placeholder="Dirección"
          onChange={handleInput}
          className="form-user__input"
        />
        <select
          name="tipo"
          value={input.tipo}
          onChange={handleInput}
          className="form-user__input"
        >
          <option value="">Seleccionar tipo</option>
          <option value="admin">Admin</option>
          <option value="empleado">Empleado</option>
          <option value="cliente">Cliente</option>
        </select>
        <input
          name="password"
          value={input.password}
          type="password"
          placeholder="Contraseña"
          onChange={handleInput}
          className="form-user__input"
        />
        <button type="submit" className="form-user__submit-button">
          GRABAR
        </button>
        {successMessage && (
          <div className="form-user__success-message">{successMessage}</div>
        )}
      </form>
    </>
  );
}

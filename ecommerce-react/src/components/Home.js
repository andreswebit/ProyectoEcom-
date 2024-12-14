import React, { useState, useEffect } from "react";
import axios from "axios";
import Usuarios from "./Usuarios";

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Realizar solicitud a una API fake
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Bienvenidos a nuestra tienda online</h1>
      <p>¡Explora una variedad de productos y ofertas exclusivas!</p>
      <Usuarios usuarios={usuarios} />
    </div>
  );
};

export default Home;

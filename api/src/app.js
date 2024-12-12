// const express = require("express");
// const morgan = require("morgan");
// const app = express();

// // Middleware para parsear JSON
// app.use(express.json());

// // Middleware para registrar solicitudes
// app.use(morgan("dev"));

// // Importar rutas
// const productsRoutes = require("./routes/productsRoutes");
// const usersRoutes = require("./routes/usersRoutes");
// const authRoutes = require("./routes/authRoutes");

// // Usar rutass
// app.use("/products", productsRoutes); //ruta a base de datos
// app.use("/users", usersRoutes);
// // Usar las rutas de autenticación
// app.use("/auth", authRoutes); // Esto asegura que las rutas estén disponibles bajo "/auth"

// // Exporta la aplicación para que sea utilizada en index.js
// module.exports = app;

const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para registrar solicitudes
app.use(morgan("dev"));

// Importar rutas
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes"); 
const ordersRoutes = require("./routes/ordersRoutes.js");

// Usar rutas
app.use("/products", productsRoutes); 
app.use("/users", usersRoutes); 
app.use("/auth", authRoutes); 
app.use("/carts", cartRoutes); 
app.use("/orders", ordersRoutes); 

// Exporta la aplicación para que sea utilizada en index.js
module.exports = app;

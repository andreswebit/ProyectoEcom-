//////////////////////////consigna 6/7///////////////
// const app = require('./src/app');

// const PORT = 3001;

// app.listen(PORT, () => {
//     console.log(`Servidor escuchando en el puerto ${PORT}`);
// });

//para probar el servidor
// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hola, Mundo!");
// });
// server.listen(3000, () => {
//     console.log("Servidor corriendo en http://localhost:3000");
//   });

///////////////////////////consigna 8 ////////////////////////

const app = require("./src/app");
const connectDB = require("./src/baseDatos");

const PORT = 3001;

connectDB(); // Conectar a la base de datos

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

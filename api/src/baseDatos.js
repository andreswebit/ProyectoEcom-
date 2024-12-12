// const products = [
//     { id: 1, name: 'Filtro de aceite', price: 100 },
//     { id: 2, name: 'Cubierta Toyota', price: 150 },
//     { id: 5, name: "ruleman",price: 1000 }
// ];

// const users = [
//     { id: 1, name: 'Andrés', email: 'andres@example.com' },
//     { id: 2, name: 'Maria', email: 'maria@example.com' }
// ];

// module.exports = { products, users };

/////////////////////////////consigna  8 ///////////////////////////

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://andrestester0001:andresweb@e--commerce.nbmj0.mongodb.net/ecommerceDB"
      
    );
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1); // Finaliza el proceso si no se puede conectar
  }
};

module.exports = connectDB;

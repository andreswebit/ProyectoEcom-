// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true, min: 0 }

// });

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Definir la referencia al modelo User
    ref: "User", // Referencia al modelo "User"
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

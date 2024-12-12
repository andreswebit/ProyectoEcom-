const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Referencia al modelo "User"
//     required: true,
//   },
//   products: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product", // Referencia al modelo "Product"
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         min: 1,
//       },
//       priceAtPurchase: { type: Number, required: true }, // Precio en el momento de la compra
//     },
//   ],
//   totalAmount: {
//     type: Number,
//     required: true, // Suma de los precios de los productos multiplicados por sus cantidades
//     min: 0,
//   },
//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending",
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.model("Order", orderSchema);

// module.exports = Order;
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      priceAtPurchase: { type: Number, required: true }, // Campo obligatorio
    },
  ],
  totalAmount: {
    type: Number,
    required: true, 
    min: 0,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
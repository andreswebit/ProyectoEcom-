const Order = require("../models/Order");

// Obtener todas las órdenes
const getAllOrdersController = async () => {
  try {
    const orders = await Order.find().populate("userId", "name").populate("products.productId", "name price");
    return orders;
  } catch (error) {
    throw new Error("Error al obtener las órdenes: " + error.message);
  }
};

// Obtener una orden por ID
const getOrderByIdController = async (id) => {
  try {
    const order = await Order.findById(id).populate("userId", "name").populate("products.productId", "name price");
    if (!order) {
      throw new Error("Orden no encontrada");
    }
    return order;
  } catch (error) {
    throw new Error("Error al obtener la orden por ID: " + error.message);
  }
};

// Crear una nueva orden
const createOrderController = async (userId, products, totalAmount) => {
  try {
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
    });

    await newOrder.save();
    return newOrder;
  } catch (error) {
    throw new Error("Error al crear la orden: " + error.message);
  }
};


// Actualizar una orden existente
const updateOrderController = async (id, updatedOrderData) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updatedOrderData, {
      new: true,
      runValidators: true,
    }).populate("userId").populate("products.productId");
    if (!updatedOrder) {
      throw new Error("Orden no encontrada");
    }
    return updatedOrder;
  } catch (error) {
    throw new Error("Error al actualizar la orden: " + error.message);
  }
};

// Eliminar una orden
const deleteOrderController = async (id) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new Error("Orden no encontrada");
    }
    return deletedOrder;
  } catch (error) {
    throw new Error("Error al eliminar la orden: " + error.message);
  }
};

module.exports = {
  getAllOrdersController,
  getOrderByIdController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
};

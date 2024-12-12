const mongoose = require("mongoose");
const {
  getAllOrdersController,
  getOrderByIdController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
} = require("../controllers/ordersControllers");
const Product = require("../models/Product"); 

// Handler para obtener todas las órdenes
const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersController();
    res.status(200).json({
      message: "Todas las órdenes obtenidas",
      orders,
    });
  } catch (error) {
    console.error("Error al obtener las órdenes:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al obtener las órdenes",
      error: error.message,
    });
  }
};

// Handler para obtener una orden por ID
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de orden no válido" });
    }

    const order = await getOrderByIdController(id);

    if (order) {
      res.status(200).json({
        message: "Orden encontrada",
        order,
      });
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la orden:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al obtener la orden",
      error: error.message,
    });
  }
};

// Handler para agregar una nueva orden
// const addOrder = async (req, res) => {
//   try {
//     const { products, totalAmount } = req.body;

//     if (!products || products.length === 0 || !totalAmount) {
//       return res.status(400).json({
//         message: "Todos los campos son obligatorios (productos y monto total)",
//       });
//     }

//     // Asignar el precio de compra al producto
//     const updatedProducts = await Promise.all(
//       products.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         if (!product) {
//           throw new Error(`Producto con ID ${item.productId} no encontrado`);
//         }
//         item.priceAtPurchase = product.price; // Asignar el precio del producto
//         return item;
//       })
//     );

//     const userId = req.user.id; // Obtener el ID del usuario autenticado
//     const newOrder = await createOrderController(userId, updatedProducts, totalAmount);

//     res.status(201).json({
//       message: "Orden creada con éxito",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error("Error al crear la orden:", error.message);
//     res.status(500).json({
//       message: "Ocurrió un error al crear la orden",
//       error: error.message,
//     });
//   }
// };

const addOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    if (!products || products.length === 0 || !totalAmount) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios (productos y monto total)",
      });
    }

    // Asignar el precio de compra a cada producto
    const updatedProducts = await Promise.all(
      products.map(async (item) => {
        // Obtener el precio actual del producto
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Producto con ID ${item.productId} no encontrado`);
        }
        // Asignar el precio del producto a priceAtPurchase
        item.priceAtPurchase = product.price; 
        return item;
      })
    );

    const userId = req.user.id; // Obtener el ID del usuario autenticado
    const newOrder = await createOrderController(userId, updatedProducts, totalAmount);

    res.status(201).json({
      message: "Orden creada con éxito",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error al crear la orden:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al crear la orden",
      error: error.message,
    });
  }
};


// Handler para editar una orden existente
const editOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de orden no válido" });
    }

    const updatedOrder = await updateOrderController(id, req.body);

    if (updatedOrder) {
      res.status(200).json({
        message: "Orden actualizada con éxito",
        order: updatedOrder,
      });
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    console.error("Error al actualizar la orden:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al actualizar la orden",
      error: error.message,
    });
  }
};

// Handler para eliminar una orden
const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de orden no válido" });
    }

    const deletedOrder = await deleteOrderController(id);

    if (deletedOrder) {
      res.status(200).json({ message: "Orden eliminada con éxito" });
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar la orden:", error.message);
    res.status(500).json({
      message: "Ocurrió un error al eliminar la orden",
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  getOrder,
  addOrder,
  editOrder,
  removeOrder,
};

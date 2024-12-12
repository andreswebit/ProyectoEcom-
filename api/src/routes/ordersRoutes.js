const express = require("express");
const {
  getOrders,
  getOrder,
  addOrder,
  editOrder,
  removeOrder,
} = require("../handlers/OrdesHandlers");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Obtener todas las órdenes
router.get("/", verifyToken, getOrders);

// Obtener una orden por ID
router.get("/:id", verifyToken, getOrder);

// Crear una nueva orden
router.post("/", verifyToken, addOrder);

// Actualizar una orden existente
router.put("/:id", verifyToken, editOrder);

// Eliminar una orden
router.delete("/:id", verifyToken, removeOrder);

module.exports = router;

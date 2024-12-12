const express = require("express");
const {
  getCarts,
  getCart,
  //addCart,
  editCart,
  removeCart,
  addToCart,
} = require("../handlers/cartHandlers");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Obtener todos los carritos
router.get("/", verifyToken, getCarts);

// Obtener un carrito por ID
router.get("/:id", verifyToken, getCart);

// Crear un nuevo carrito
//router.post("/", verifyToken, addCart);
router.post("/", verifyToken, addToCart); // Ruta para agregar productos al carrito

// Actualizar un carrito existente
router.put("/:id", verifyToken, editCart);

// Eliminar un carrito
router.delete("/:id", verifyToken, removeCart);

module.exports = router;

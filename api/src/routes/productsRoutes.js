const express = require("express");

const {
  getProducts,
  addProduct,
  removeProduct,
  editProduct,
  //getProduct,
} = require("../handlers/productsHandlers");
const verifyToken = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin")

//const { getProductById } = require('../controllers/productControllers');
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProducts);

// Ruta para manejar solicitudes POST a "/products"

router.post("/", verifyToken, authorizeAdmin, addProduct); // Ruta protegida


router.put("/:id", verifyToken, authorizeAdmin ,editProduct);

//borrar

router.delete("/:id", verifyToken, authorizeAdmin, removeProduct);

module.exports = router;

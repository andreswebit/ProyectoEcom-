const express = require("express");
const { registerHandler, loginHandler } = require("../handlers/authHandlers");

const router = express.Router();

// Registrar un nuevo usuario (abierto a todos)
router.post("/register", registerHandler);

// Iniciar sesión (abierto a todos)
router.post("/login", loginHandler);

module.exports = router;

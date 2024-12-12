const { registerController, loginController } = require('../controllers/authControllers');

// Handler para manejar el registro
const registerHandler = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const newUser = await registerController(name, username, email, password, role);
    res.status(201).send(newUser);  // Responder con el usuario creado
  } catch (err) {
    res.status(500).send(err.message);  // Manejo de errores
  }
};

// Handler para manejar el inicio de sesión
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginController(email, password);
    res.status(200).send(response);  // Responder con el token y el usuario
  } catch (err) {
    res.status(401).send({ message: err.message });  // Manejo de errores
  }
};

module.exports = { registerHandler, loginHandler };

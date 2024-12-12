const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Extraer el token del header 'Authorization'
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send("Se requiere autenticación");
  }

  const token = authHeader.split(" ")[1];

  // Verificar el token con la clave secreta
  jwt.verify(token, "mi_clave_secreta", (err, decoded) => {
    if (err) {
      return res.status(401).send("Token no válido");
    }
    req.user = decoded; // Almacenar el usuario decodificado en la solicitud
    next(); // Continuar con la ejecución del siguiente middleware o ruta
  });
};

module.exports = authMiddleware;

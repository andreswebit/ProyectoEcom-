const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('No tienes permisos para acceder a esta ruta');
  }
  next(); // Continuar si el usuario es admin
};

module.exports = authorizeAdmin;

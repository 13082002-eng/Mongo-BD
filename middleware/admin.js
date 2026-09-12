const admin = (req, res, next) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      message: "Acceso denegado. Se requieren permisos de administrador.",
    });
  }

  next();
};

module.exports = admin;
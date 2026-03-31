export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Vérifier si user existe (injecté par protect)
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Vérifier si le rôle est autorisé
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Role (${req.user.role}) not allowed`,
      });
    }

    next();
  };
};
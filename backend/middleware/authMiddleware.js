export const isAdmin = (req, res, next) => {
    // Nota: Esto requiere que tengas un sistema de login con sesiones o JWT.
    // Por ahora, asumimos que el usuario logueado viene en req.user
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Acceso denegado: Se requieren privilegios de administrador" });
    }
};
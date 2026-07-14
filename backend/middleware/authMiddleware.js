// backend/middleware/authMiddleware.js
export const isAdmin = (req, res, next) => {
    // Leemos el rol desde el header personalizado 'x-user-role'
    const role = req.headers['x-user-role'];

    if (role === 'admin') {
        next(); // Es admin, dejamos pasar
    } else {
        res.status(403).json({ message: "Acceso denegado: Se requieren privilegios de administrador" });
    }
};
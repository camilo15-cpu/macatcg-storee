import express from 'express';
import User from '../models/User.js'; 
const router = express.Router();

// Ruta para REGISTRAR
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Por defecto, todos se crean como 'user'
        const newUser = await User.create({ 
            email, 
            password,
            role: 'user' 
        });
        res.status(201).json({ message: "Usuario creado con éxito", userId: newUser._id });
    } catch (error) {
        res.status(400).json({ message: "Error al registrar", error });
    }
});

// Ruta para LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Buscamos el usuario
    const user = await User.findOne({ email, password });
    
    if (user) {
        // Devolvemos el email y el rol para que el frontend sepa qué mostrar
        res.json({ 
            message: "Login exitoso", 
            email: user.email,
            role: user.role // <--- ESTO ES CLAVE PARA TU RÚBRICA
        });
    } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
    }
});

export default router;
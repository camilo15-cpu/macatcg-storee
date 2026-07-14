import express from 'express';
import User from '../models/user.js'; // correccion linux
const router = express.Router();

// Ruta para REGISTRAR
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Verificar si el usuario ya existe para evitar duplicados
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Por defecto, todos se crean como 'user'
        const newUser = await User.create({ 
            email, 
            password,
            role: 'user' 
        });
        
        res.status(201).json({ 
            message: "Usuario creado con éxito", 
            userId: newUser._id 
        });
    } catch (error) {
        res.status(400).json({ message: "Error al registrar", error: error.message });
    }
});

// Ruta para LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Buscamos el usuario
        const user = await User.findOne({ email, password });
        
        if (user) {
            // Devolvemos el email y el rol para que el frontend pueda activar el Panel Admin
            res.json({ 
                message: "Login exitoso", 
                email: user.email,
                role: user.role // Esto es lo que lee tu Navbar.tsx
            });
        } else {
            res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

export default router;

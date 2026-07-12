import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'; // Importar rutas

dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Enlazar las rutas de productos bajo el prefijo /api/products
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API de MACA TCG corriendo impecable');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
import express from 'express';
import { getProducts, deleteProduct } from '../controllers/productController.js'; 
import { isAdmin } from '../middleware/authMiddleware.js'; // Importamos el guardián

const router = express.Router();

// Ruta pública para ver productos
router.get('/', getProducts);

// Nueva ruta protegida para eliminar productos
// Solo quienes pasen por 'isAdmin' podrán llegar a 'deleteProduct'
router.delete('/:id', isAdmin, deleteProduct);

export default router;
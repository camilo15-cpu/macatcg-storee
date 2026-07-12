import express from 'express';
import { getProducts, createProduct } from '../controllers/productController.js';

const router = express.Router();

// Vincular rutas con los controladores
router.route('/')
  .get(getProducts)
  .post(createProduct);

export default router;
import express from 'express';
import { getProducts } from '../controllers/productController.js'; // OJO: pon el .js al final

const router = express.Router();

router.get('/', getProducts);

export default router;
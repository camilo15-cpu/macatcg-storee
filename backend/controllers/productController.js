import Product from '../models/Product.js';

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

// @desc    Crear un producto (Útil para meter cartas de prueba más adelante)
// @route   POST /api/products
// @access  Public (Por ahora, para pruebas)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, game, stock, rarity } = req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      game,
      stock,
      rarity
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error: error.message });
  }
};
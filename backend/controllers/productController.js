import Product from '../models/Product.js'; 
import mongoose from 'mongoose'; // Importamos mongoose para validar el ID

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validamos que el ID sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Formato de ID inválido" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
  }
};
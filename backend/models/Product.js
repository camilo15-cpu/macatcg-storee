import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL de la imagen de la carta
  category: { type: String, required: true }, // 'OFERTAS', 'Preventas', 'Sellados en stock', etc.
  game: { type: String, required: true }, // 'Pokémon', 'Magic', 'Yu-Gi-Oh!', 'Warhammer', etc.
  stock: { type: Number, required: true, default: 0 },
  rarity: { type: String }, // 'Ultra Rare', 'Secret Rare', 'Común', etc. (Opcional)
}, {
  timestamps: true // Crea automáticamente campos "createdAt" y "updatedAt"
});

const Product = mongoose.model('Product', productSchema);
export default Product;
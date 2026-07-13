import mongoose from 'mongoose';
import dotenv from 'dotenv';
import{ connectDB } from './config/db.js';
import Product from './models/Product.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Limpiar productos existentes para no duplicar en las pruebas
    await Product.deleteMany();

    const sampleProducts = [
      {
        name: "Charizard ex - 199/165 (Scarlet & Violet: 151)",
        description: "Carta original de colección Ultra Rare en idioma inglés. Estado Near Mint.",
        price: 120000,
        image: "https://images.pokemontcg.io/sv3pt5/199_hires.png",
        category: "Sellados en stock",
        game: "Pokémon",
        stock: 3,
        rarity: "Ultra Rare"
      },
      {
        name: "Caja de Sobres (Booster Box) - Twilight Masquerade",
        description: "Caja sellada de fábrica que contiene 36 paquetes de mejora (sobres) en inglés.",
        price: 145000,
        image: "https://images.pokemontcg.io/sv6/boosterbox_hires.png", // Puedes cambiar esta URL por una imagen real más adelante
        category: "Preventas",
        game: "Pokémon",
        stock: 10,
        rarity: "Booster Box"
      },
      {
        name: "Pikachu ex - 238/191 (Surging Sparks)",
        description: "Carta Secreta de la expansión Surging Sparks. Altamente coleccionable.",
        price: 85000,
        image: "https://images.pokemontcg.io/sv8/238_hires.png",
        category: "OFERTAS",
        game: "Pokémon",
        stock: 1,
        rarity: "Secret Rare"
      }
    ];

    await Product.insertMany(sampleProducts);
    console.log('¡Datos de cartas TCG importados con éxito!');
    process.exit();
  } catch (error) {
    console.error(`Error al importar datos: ${error.message}`);
    process.exit(1);
  }
};

importData();
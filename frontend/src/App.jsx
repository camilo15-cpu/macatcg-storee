import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';

// Datos temporales para visualizar el diseño en casa
const mockProducts = [
  {
    _id: "1",
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
    _id: "2",
    name: "Caja de Sobres (Booster Box) - Twilight Masquerade",
    description: "Caja sellada de fábrica que contiene 36 paquetes de mejora (sobres) en inglés.",
    price: 145000,
    image: "https://images.pokemontcg.io/sv6/boosterbox_hires.png",
    category: "Preventas",
    game: "Pokémon",
    stock: 10,
    rarity: "Booster Box"
  },
  {
    _id: "3",
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

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Intentar traer los datos reales desde tu Backend
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        return res.json();
      })
      .then((data) => {
        // Si el backend responde con datos, los usamos
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(mockProducts);
        }
      })
      .catch((err) => {
        console.log("Backend desconectado o sin Atlas. Usando cartas de prueba locales.");
        setProducts(mockProducts);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-black text-white tracking-tight">
            PRODUCTOS DESTACADOS
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Explora las últimas novedades de tus TCG favoritos.
          </p>
        </div>

        {/* Grilla Responsiva de Cartas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import ProductCard from './components/ProductCard';
import { CartPanel } from './components/CartPanel';
import { LoginModal } from './components/LoginModal'; // Importación añadida

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  game: string;
  stock: number;
  rarity?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  { _id: "1", name: "Charizard ex - 199/165 (Scarlet & Violet: 151)", description: "Carta original de colección Ultra Rare en idioma inglés. Estado Near Mint.", price: 120000, image: "https://images.pokemontcg.io/sv3pt5/199_hires.png", category: "Sellados en stock", game: "Pokémon", stock: 3, rarity: "Ultra Rare" },
  { _id: "2", name: "Caja de Sobres (Booster Box) - Twilight Masquerade", description: "Caja sellada de fábrica que contiene 36 paquetes de mejora (sobres) en inglés.", price: 145000, image: "https://images.pokemontcg.io/sv6/boosterbox_hires.png", category: "Preventas", game: "Pokémon", stock: 10, rarity: "Booster Box" },
  { _id: "3", name: "Pikachu ex - 238/191 (Surging Sparks)", description: "Carta Secreta de la expansión Surging Sparks. Altamente coleccionable.", price: 85000, image: "https://images.pokemontcg.io/sv8/238_hires.png", category: "OFERTAS", game: "Pokémon", stock: 1, rarity: "Secret Rare" },
  { _id: "4", name: "Elite Trainer Box (ETB) - Shrouded Fable", description: "Caja de Entrenador Élite que incluye 9 sobres, fundas de Greninja y accesorios de juego.", price: 49990, image: "https://images.pokemontcg.io/sv6pt5/etb_hires.png", category: "Sellados en stock", game: "Pokémon", stock: 6, rarity: "Elite Trainer Box" },
  { _id: "5", name: "Mew ex - 232/091 (Paldean Fates)", description: "Edición especial Shiny Rare de colección en idioma inglés. Estado impecable.", price: 95000, image: "https://images.pokemontcg.io/sv4pt5/232_hires.png", category: "OFERTAS", game: "Pokémon", stock: 2, rarity: "Shiny Ultra Rare" },
  { _id: "6", name: "Blastoise ex - 200/165 (Scarlet & Violet: 151)", description: "Carta especial de ilustración rara (Special Illustration Rare). Idioma inglés.", price: 55000, image: "https://images.pokemontcg.io/sv3pt5/200_hires.png", category: "Sellados en stock", game: "Pokémon", stock: 4, rarity: "Special Illustration Rare" },
  { _id: "7", name: "Caja de Sobres (Booster Box) - Stellar Crown", description: "Reserva tu Booster Box de la expansión Stellar Crown. Contiene 36 sobres.", price: 138000, image: "https://images.pokemontcg.io/sv7/boosterbox_hires.png", category: "Preventas", game: "Pokémon", stock: 12, rarity: "Booster Box" },
  { _id: "8", name: "Gengar ex - 193/162 (Temporal Forces)", description: "Carta Ultra Rare holográfica de la expansión Temporal Forces. Idioma inglés.", price: 32000, image: "https://images.pokemontcg.io/sv5/193_hires.png", category: "OFERTAS", game: "Pokémon", stock: 0, rarity: "Ultra Rare" }
];

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Estado para Login

  // --- PERSISTENCIA: CARGAR AL INICIAR ---
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // --- PERSISTENCIA: GUARDAR AL CAMBIAR ---
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  //Al cargar la tienda, se piden los productos reales al backend (no son datos inventados)
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(mockProducts);
        }
      })
      .catch(() => {
        console.log("Backend offline. Cargando cartas locales.");
        setProducts(mockProducts);
      });
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      //En esta parte no deja agregar al carrito mas unidades que el stock disponible
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert("¡No hay suficiente stock disponible!");
          return prevCart;
        }
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = category === "" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Navbar 
        onSelectCategory={setCategory} 
        selectedCategory={category} 
        cartCount={totalItemsInCart} 
        onToggleCart={() => setIsCartOpen(!isCartOpen)} 
        onToggleLogin={() => setIsLoginOpen(true)} // Prop añadida
      />
      
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            {category === "" ? "Productos Destacados" : category}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {category === "" 
              ? "Explora las últimas novedades de tus TCG favoritos." 
              : `Viendo todos los productos de la categoría ${category}.`}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-800">
            <p className="text-slate-400 font-medium">No hay productos disponibles en esta categoría por el momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

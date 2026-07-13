import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import ProductCard from './components/ProductCard';
import { CartPanel } from './components/CartPanel';
import { LoginModal } from './components/LoginModal';

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

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // 1. Cargar productos desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // 2. Persistencia del carrito
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Lógica del Carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert("¡No hay suficiente stock!");
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
        onToggleLogin={() => setIsLoginOpen(true)}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
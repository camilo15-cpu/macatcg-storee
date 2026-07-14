import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  cartCount: number;
  onToggleCart: () => void;
  onToggleLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSelectCategory, 
  selectedCategory, 
  cartCount, 
  onToggleCart, 
  onToggleLogin
}) => {
  const [user, setUser] = useState<any>(null);

  // Cargamos el usuario al montar el componente
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  const categories = ["OFERTAS", "Preventas", "Sellados en stock"];

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800">
      <div className="bg-blue-600 text-white text-center text-xs py-2 font-semibold tracking-wide">
        🚚 Envíos a todo Chile por $5.000 y GRATIS en compras sobre $100.000.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-black tracking-wider text-white flex items-center gap-2 cursor-pointer" onClick={() => onSelectCategory("")}>
          MACA <span className="text-blue-500">TCG</span>
        </div>

        <div className="w-full md:w-1/2 relative">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-hidden focus:border-blue-500 transition-colors placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          {/* RENDERIZADO CONDICIONAL DE USUARIO */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* Botón Admin solo visible si el usuario es admin */}
              {user.role === 'admin' && (
                <button className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white font-bold cursor-pointer transition-colors">
                  Panel Admin
                </button>
              )}
              <span className="text-slate-400">{user.email}</span>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 cursor-pointer">Salir</button>
            </div>
          ) : (
            <div onClick={onToggleLogin} className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer">
              <span>👤 Iniciar sesión</span>
            </div>
          )}
          
          <div 
            onClick={onToggleCart} 
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
          >
            <span>🛒</span>
            <span className="font-bold text-blue-400">{cartCount}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto py-3 text-sm font-bold">
          <button
            onClick={() => onSelectCategory("")}
            className={`cursor-pointer transition-colors whitespace-nowrap ${selectedCategory === "" ? "text-blue-400" : "text-slate-400 hover:text-white"}`}
          >
            Todos los productos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`cursor-pointer transition-colors whitespace-nowrap ${selectedCategory === cat ? (cat === "OFERTAS" ? "text-amber-500" : "text-blue-400") : "text-slate-400 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
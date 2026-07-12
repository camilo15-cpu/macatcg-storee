import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="w-full font-sans">
      {/* Top Banner Azul */}
      <div className="w-full bg-[#1e62bb] text-white text-center py-2 text-xs md:text-sm font-medium">
        🚚 Envíos a todo Chile por $5.000 y GRATIS en compras sobre $100.000. <span className="hidden md:inline">(Excluye promociones especiales).</span>
      </div>

      {/* Barra Principal Blanca */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 font-bold text-2xl text-[#1e62bb] tracking-wider cursor-pointer">
          MACA TCG
        </div>

        {/* Buscador */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1e62bb]"
          />
          <button className="absolute right-3 top-2.5 text-gray-500 hover:text-[#1e62bb]">
            <Search size={20} />
          </button>
        </div>

        {/* Botones Derecha */}
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <button className="flex items-center gap-2 hover:text-[#1e62bb]">
            <User size={20} />
            <span className="hidden sm:inline">Iniciar sesión</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#1e62bb] relative">
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">0 Producto(s)</span>
          </button>
        </div>
      </div>

      {/* Menú de Categorías Gris Oscuro */}
      <nav className="w-full bg-[#2a2d32] text-white overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 py-3 text-xs md:text-sm font-semibold tracking-wide">
          <a href="#" className="hover:text-amber-400 text-amber-400">OFERTAS</a>
          <a href="#" className="hover:text-amber-400">Preventas</a>
          <a href="#" className="hover:text-amber-400">Sellados en stock</a>
          <a href="#" className="hover:text-amber-400">Juego de cartas</a>
          <a href="#" className="hover:text-amber-400">Warhammer</a>
          <a href="#" className="hover:text-amber-400">Juegos de Mesa</a>
          <a href="#" className="hover:text-amber-400">Accesorios Y Otros</a>
        </div>
      </nav>
    </header>
  );
};
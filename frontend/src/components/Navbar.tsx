interface NavbarProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectCategory, selectedCategory }) => {
  const categories = [
    "OFERTAS", 
    "Preventas", 
    "Sellados en stock", 
  ];

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800">
      {/* ... Tu código actual del banner y buscador se mantiene igual ... */}
      
      {/* Barra de Categorías */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto py-3 text-sm font-bold">
          {/* Botón para restablecer y ver todo */}
          <button
            onClick={() => onSelectCategory("")}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              selectedCategory === "" ? "text-blue-400" : "text-slate-400 hover:text-white"
            }`}
          >
            Todos los productos
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`cursor-pointer transition-colors whitespace-nowrap ${
                selectedCategory === cat 
                  ? cat === "OFERTAS" ? "text-amber-500" : "text-blue-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
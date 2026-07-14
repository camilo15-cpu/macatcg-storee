import React from 'react';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onDelete }) => {
  // Obtener usuario para verificar rol
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role === 'admin';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: 'DELETE',
        headers: {
          'x-user-role': user.role || '' // Aseguramos que envíe algo
        }
      });

      if (response.ok) {
        alert("Producto eliminado correctamente");
        if (onDelete) onDelete(product._id);
      } else if (response.status === 403) {
        alert("Acceso denegado: No tienes permisos de administrador");
      } else if (response.status === 404) {
        alert(`Error: El producto con ID ${product._id} no existe en la base de datos.`);
      } else {
        alert("Ocurrió un error inesperado al intentar eliminar.");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 flex flex-col h-full group">
      {/* Contenedor de la Imagen */}
      <div className="relative p-4 bg-slate-900 flex justify-center items-center overflow-hidden h-72">
         <img src={product.image} alt={product.name} className="h-full object-contain transform group-hover:scale-105 transition-transform duration-300"/>
         {product.rarity && (
           <span className="absolute top-2 right-2 bg-blue-600/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-xs font-semibold">{product.rarity}</span>
         )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-700 text-slate-300 rounded">{product.game}</span>
          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded">{product.category}</span>
        </div>
        
        <h3 className="text-lg font-bold text-white line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">{product.name}</h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-grow">{product.description}</p>

        {/* Sección de Acciones */}
        <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-emerald-400">{formatPrice(product.price)}</span>
              <span className="text-xs text-slate-500">Stock: {product.stock}</span>
            </div>
            <button 
              disabled={product.stock === 0}
              onClick={() => onAddToCart(product)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                product.stock > 0 ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {product.stock > 0 ? 'Agregar' : 'Agotado'}
            </button>
          </div>

          {/* Botón Admin */}
          {isAdmin && (
            <button 
              onClick={handleDelete}
              className="w-full mt-2 bg-red-600/20 text-red-400 border border-red-600/50 hover:bg-red-600 hover:text-white py-1 rounded-lg text-xs font-bold transition-all"
            >
              Eliminar Producto
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
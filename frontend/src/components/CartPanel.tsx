import React from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
}

export const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose, cart }) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro para cerrar al hacer clic afuera */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose}></div>
      
      {/* Panel lateral */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-white">Tu Carrito</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl cursor-pointer">×</button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-slate-500 text-center py-10">Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-slate-800 rounded" />
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                  <p className="text-emerald-400 text-sm">{item.quantity} x ${item.price.toLocaleString('es-CL')}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-slate-700 pt-4 mt-4">
          <div className="flex justify-between text-lg font-bold text-white mb-4">
            <span>Total:</span>
            <span>${total.toLocaleString('es-CL')}</span>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};
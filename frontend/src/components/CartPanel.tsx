import React, { useState } from 'react';

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
  const [isConfirming, setIsConfirming] = useState(false);
  
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Aquí es donde en la U conectaremos el envío de la orden al backend
    alert("¡Pedido enviado con éxito! ");
    setIsConfirming(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-white">
            {isConfirming ? "Confirmar Pedido" : "Tu Carrito"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl cursor-pointer">×</button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-slate-500 text-center py-10">Tu carrito está vacío.</p>
          ) : !isConfirming ? (
            // Lista de productos
            cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-slate-800 rounded" />
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                  <p className="text-emerald-400 text-sm">{item.quantity} x ${item.price.toLocaleString('es-CL')}</p>
                </div>
              </div>
            ))
          ) : (
            // Pantalla de confirmación
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <p className="text-slate-300 text-sm mb-4">¿Estás seguro de finalizar tu compra por un total de:</p>
              <p className="text-3xl font-black text-white mb-6">${total.toLocaleString('es-CL')}</p>
              <p className="text-xs text-slate-500 italic">Al confirmar, se enviarán tus datos de usuario y el carrito actual a nuestro sistema.</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-slate-700 pt-4 mt-4">
            {!isConfirming ? (
              <button 
                onClick={() => setIsConfirming(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer"
              >
                Finalizar Compra
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsConfirming(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg cursor-pointer"
                >
                  Volver
                </button>
                <button 
                  onClick={handleCheckout}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
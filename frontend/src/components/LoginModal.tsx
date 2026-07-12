import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // AQUÍ ES DONDE HARÁS EL FETCH EN LA U
    console.log("Datos a enviar:", { email, password, isLogin });
    alert("Ahora falta conectar este formulario con tu backend en la U.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-sm border border-slate-700 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-white">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Correo electrónico" 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 py-2 rounded-lg font-bold hover:bg-blue-500 cursor-pointer text-white transition-all">
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-400">
          {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 font-bold hover:underline cursor-pointer">
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};
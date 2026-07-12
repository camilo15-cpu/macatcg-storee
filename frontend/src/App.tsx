import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Destacados</h2>
        <p className="text-gray-500">¡Aquí pondremos las tarjetas de las cartas de Pokémon!</p>
      </main>
    </div>
  );
}

export default App;
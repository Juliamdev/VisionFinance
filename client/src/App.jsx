import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { SimulatorPage } from './pages/SimulatorPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-slate-50 min-h-screen">
        {/* A Sidebar fica fixa em todas as páginas */}
        <Sidebar />
       
        
        <main className="flex-1 p-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/simulador" element={<SimulatorPage />} />
            {/* Você pode adicionar rotas para 'Investimentos' depois */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
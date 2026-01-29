import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

// Importação dos seus componentes e páginas
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { SimulatorPage } from './pages/SimulatorPage';
import { Auth } from './pages/Auth'; // Certifique-se de criar este arquivo

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verifica a sessão atual ao carregar o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuta mudanças de estado (Login, Logout, Cadastro)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Enquanto verifica se o usuário está logado, mostra uma tela vazia ou carregando
  if (loading) return null;

  return (
    <BrowserRouter>
      {!session ? (
        /* SE NÃO ESTIVER LOGADO: Mostra apenas a tela de Auth */
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      ) : (
        /* SE ESTIVER LOGADO: Mostra a estrutura completa do VisionFinance */
        <div className="flex bg-slate-50 min-h-screen">
          <Sidebar />
          
          <main className="flex-1 p-10">
            <Routes>
              {/* Passamos a session para o Dashboard para ele saber o ID do usuário */}
              <Route path="/" element={<Dashboard session={session} />} />
              <Route path="/simulador" element={<SimulatorPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
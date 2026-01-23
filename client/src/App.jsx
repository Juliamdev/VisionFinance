import { Sidebar } from './components/Sidebar';
import { AssetChart } from './components/AssetChart';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';


function App() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-10">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resumo da Carteira</h1>
            <p className="text-slate-500">Bem-vinda de volta, Júlia!</p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-slate-200">
            + Novo Investimento
          </button>
        </header>

        {/* Grid de Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard title="Patrimônio Total" value="R$ 45.250,00" percentage="+12.5%" positive />
          <SummaryCard title="Rendimento Mensal" value="R$ 1.120,40" percentage="+2.4%" positive />
          <SummaryCard title="Projeção 12 meses" value="R$ 52.300,00" percentage="-0.5%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AssetChart />
          {/* Aqui poderíamos ter uma tabela ou outro gráfico de linha futuramente */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center text-slate-400">
            Próximo Componente: Evolução Patrimonial
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ title, value, percentage, positive = false }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{value}</h3>
      <div className={`flex items-center gap-1 text-sm font-semibold ${positive ? 'text-emerald-600' : 'text-rose-500'}`}>
        {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {percentage}
        <span className="text-slate-400 font-normal ml-1">vs mês anterior</span>
      </div>
    </div>
  );
}

export default App;
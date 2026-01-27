import { InvestmentSimulator } from '../components/InvestmentSimulator';
import { Info } from 'lucide-react';

export function SimulatorPage() {
  return (
    <>
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Simulador Financeiro</h1>
          <p className="text-slate-500">Projete o crescimento do seu patrimônio a longo prazo.</p>
        </div>
        
        {/* Um pequeno aviso delicado no topo */}
        <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <Info size={14} />
          <span>Valores baseados em juros compostos mensais.</span>
        </div>
      </header>

      <section className="animate-in fade-in duration-500">
        <InvestmentSimulator />
      </section>

      {/* Dica extra de UX: Cards de Insights abaixo do simulador */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
          <h4 className="text-emerald-900 font-bold mb-2">O poder do tempo</h4>
          <p className="text-emerald-700 text-sm leading-relaxed">
            Note como o aumento do período (meses) impacta exponencialmente o resultado final. 
            É o efeito dos juros sobre juros.
          </p>
        </div>
        
        <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200">
          <h4 className="text-slate-900 font-bold mb-2">Aportes Mensais</h4>
          <p className="text-slate-700 text-sm leading-relaxed">
            Manter uma constância nos aportes costuma ser mais eficiente para o acúmulo de riqueza 
            do que tentar acertar o momento exato do mercado.
          </p>
        </div>
      </div>
    </>
  );
}
import { Trash2, TrendingUp } from 'lucide-react';

export function InvestmentTable({ assets, onDelete }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ativo</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Qtd</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Preço Médio</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rendimento</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acções</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {assets.map((asset, index) => {
              // Lógica de Rendimento (Simulada em 10% para este exemplo)
              const valorInvestido = Number(asset.quantity) * Number(asset.price);
              const rendimentoSimulado = valorInvestido * 0.10;
              
              // Formatação da Data vinda do Supabase
              const dataFormatada = asset.created_at 
                ? new Date(asset.created_at).toLocaleDateString('pt-PT') 
                : 'Pendente';

              return (
                <tr key={asset.id || index} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <TrendingUp size={14} className="text-slate-900" />
                      </div>
                      <span className="font-bold text-slate-900">{asset.ticker}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500 text-sm">{dataFormatada}</td>
                  <td className="p-4 text-slate-600">{asset.quantity}</td>
                  <td className="p-4 text-slate-600">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(asset.price)}
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-600 font-bold">
                      +{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rendimentoSimulado)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => onDelete(index)}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {assets.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            Nenhum investimento registado no VisionFinance.
          </div>
        )}
      </div>
    </div>
  );
}
import { Trash2, TrendingUp } from 'lucide-react';

export function InvestmentTable({ assets, onDelete }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">Meus Ativos</h3>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {assets.length} ativos cadastrados
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Ticker</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Qtd.</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Preço Médio</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {assets.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-slate-400 text-sm italic">
                  Nenhum investimento cadastrado ainda.
                </td>
              </tr>
            ) : (
              assets.map((asset, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <TrendingUp className="text-white" size={14} />
                      </div>
                      <span className="font-bold text-slate-900">{asset.ticker}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-600">{asset.quantity}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-600">
                    {Number(asset.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => onDelete(index)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
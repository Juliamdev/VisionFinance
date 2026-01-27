import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function SummaryCard({ title, value, percentage, positive = false }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{value}</h3>
      <div className={`flex items-center gap-1 text-sm font-semibold ${positive ? 'text-emerald-600' : 'text-rose-500'}`}>
        {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {percentage}
        <span className="text-slate-400 font-normal ml-1 text-xs">vs mês anterior</span>
      </div>
    </div>
  );
}
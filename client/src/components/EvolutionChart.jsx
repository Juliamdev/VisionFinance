import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function EvolutionChart({ assets }) {
  // Lógica para gerar dados simulados de evolução baseados nos seus ativos
  const generateData = () => {
    const totalPrincipal = assets.reduce((acc, a) => acc + (a.quantity * a.price), 0);
    
    // Simulamos uma evolução de 6 meses com rendimento de 1.5% a.m.
    return Array.from({ length: 6 }).map((_, i) => {
      const monthPrincipal = totalPrincipal; 
      const monthWithInterest = totalPrincipal * Math.pow(1.015, i); // Juros Compostos
      
      return {
        mes: `Mês ${i + 1}`,
        investido: monthPrincipal,
        total: monthWithInterest
      };
    });
  };

  const data = generateData();

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
      <h3 className="text-lg font-bold text-slate-900 mb-6 text-left">Evolução Patrimonial</h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          <Area type="monotone" dataKey="investido" name="Valor Acumulado" stroke="#cbd5e1" fill="#f8fafc" />
          <Area type="monotone" dataKey="total" name="Com Juros" stroke="#0f172a" fill="#f1f5f9" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
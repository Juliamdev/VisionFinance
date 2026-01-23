import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Dados fictícios para visualização
const data = [
  { name: 'Ações', value: 400 },
  { name: 'Renda Fixa', value: 300 },
  { name: 'FIIs', value: 200 },
  { name: 'Cripto', value: 100 },
];

// Cores delicadas e profissionais
const COLORS = ['#0f172a', '#334155', '#10b981', '#94a3b8'];

export function AssetChart() {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[400px] w-full">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Distribuição de Ativos</h3>
      
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Faz o gráfico parecer uma "rosca" (mais moderno)
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
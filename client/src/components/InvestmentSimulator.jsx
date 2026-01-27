import { useState, useEffect } from "react";
import { Calculator, Info } from "lucide-react";

export function InvestmentSimulator() {
    const [initial, setInitial] = useState(1000);
    const [monthly, setMonthly] = useState(100);
    const [rate, setRate] = useState(1);
    const [period, setPeriod] = useState(12);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let finalValue = initial;
        const monthlyRate = rate / 100;

        for(let i = 0; i < period; i++) {
            finalValue = (finalValue + monthly) * (1 + monthlyRate);
        }

        setTotal(finalValue);
    }, [initial, monthly, rate, period]);

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm w-full">
            <div className="flex items-center gap-2 mb-8">
                <Calculator className="text-slate-900" size={24} />
                <h3 className="text-xl font-bold text-slate-900">Simulador de Futuro</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário de Inputs*/}
                <div>
                    <InputGroup label="Investimento Inicial (R$)" value={initial} onChange={setInitial}/>
                    <InputGroup label="Aporte Mensal (R$)" value={monthly} onChange={setMonthly} />
                    <InputGroup label="Taxa de Juros (% ao mês)" value={rate} onChange={setRate} />
                    <InputGroup label="Período (Meses)" value={period} onChange={setPeriod} />
                </div>

                {/* Resultado Visual */}
                <div className="bg-slate-900 rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white">
                <p className="text-slate-400 font-medium mb-2">Valor Estimado Final</p>
                <h2 className="text-4xl font-bold mb-4">
                    {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h2>
                <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-400/10 px-4 py-2 rounded-full">
                    <Info size={16} />
                    Cálculo baseado em juros compostos
                </div>
                </div>
            </div>
            </div>
    );

}
function InputGroup({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-600">{label}</label>
      <input 
        type="number" 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
      />
    </div>
  );
}
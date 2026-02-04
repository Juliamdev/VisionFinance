import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { AssetChart } from '../components/AssetChart';
import { EvolutionChart } from '../components/EvolutionChart'; // Importe o novo gráfico aqui
import { Modal } from '../components/Modal';
import { SummaryCard } from '../components/SummaryCard';
import { InvestmentTable } from '../components/InvestmentTable';
import { supabase } from '../lib/supabaseClient';

export function Dashboard({ session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({ ticker: '', quantity: '', price: '' });

  // 1. BUSCA DADOS PRIVADOS
  useEffect(() => {
    const fetchInvestments = async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', session.user.id); 

      if (data) setAssets(data);
      if (error) console.error("Erro ao buscar:", error.message);
    };

    if (session?.user?.id) {
      fetchInvestments();
    }
  }, [session]);

  // 2. SALVAR COM USER_ID
  const handleSave = async (e) => {
    e.preventDefault();
    
    const newInvestment = { 
      ticker: formData.ticker, 
      quantity: Number(formData.quantity), 
      price: Number(formData.price),
      user_id: session.user.id 
    };

    const { data, error } = await supabase
      .from('investments')
      .insert([newInvestment]);

    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      // Para garantir que a data apareça após salvar, o ideal é buscar do banco novamente
      // ou adicionar uma data manual temporária:
      setAssets(prev => [...prev, { ...newInvestment, created_at: new Date().toISOString() }]);
      setIsModalOpen(false);
      setFormData({ ticker: '', quantity: '', price: '' });
    }
  };

  const handleDelete = (indexToDelete) => {
    setAssets(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ticker' ? value.toUpperCase() : value
    }));
  };

  // --- LÓGICA DE CÁLCULO ---
  const totalPatrimonio = assets.reduce((acc, asset) => {
    return acc + (Number(asset.quantity || 0) * Number(asset.price || 0));
  }, 0);

  const totalFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPatrimonio);
  const rendimentoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPatrimonio * 0.024);

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10 flex justify-between items-center text-left">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">VisionFinance</h1>
          <p className="text-slate-500">Bem-vinda de volta, Júlia!</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} /> Novo Ativo
        </button>
      </header>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
        <SummaryCard title="Patrimônio Total" value={totalFormatado} percentage={`+${assets.length} ativos`} positive />
        <SummaryCard title="Projeção (2.4% a.m.)" value={rendimentoFormatado} percentage="Rendimento" positive />
        <SummaryCard title="Ativos em Carteira" value={assets.length.toString()} percentage="Unidades" />
      </div>

      {/* Seção de Gráficos: Agora com o Gráfico de Evolução */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-start">
        <EvolutionChart assets={assets} />
        <AssetChart assets={assets} />
      </div>

      {/* Tabela de Investimentos com Datas e Rendimentos */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4 text-left">Sua Carteira Detalhada</h2>
        <InvestmentTable assets={assets} onDelete={handleDelete} />
      </div>

      {/* Modal permanece igual */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastrar Ativo">
        <form className="space-y-5" onSubmit={handleSave}>
          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-slate-600">Ticker</label>
            <input name="ticker" type="text" required value={formData.ticker} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900" placeholder="Ex: PETR4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-600">Quantidade</label>
              <input name="quantity" type="number" required value={formData.quantity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-600">Preço Médio</label>
              <input name="price" type="number" step="0.01" required value={formData.price} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold mt-4">
            Salvar no VisionFinance
          </button>
        </form>
      </Modal>
    </div>
  );
}
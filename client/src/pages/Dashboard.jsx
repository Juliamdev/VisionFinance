import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AssetChart } from '../components/AssetChart';
import { Modal } from '../components/Modal';
import { SummaryCard } from '../components/SummaryCard';
import { InvestmentTable } from '../components/InvestmentTable'; // Novo Import

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. A LISTA DE VERDADE: Aqui moram seus dados agora
  const [assets, setAssets] = useState([]);
  
  const [formData, setFormData] = useState({ ticker: '', quantity: '', price: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ticker' ? value.toUpperCase() : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // 2. ADICIONANDO NA LISTA: Mantém o que já tinha e adiciona o novo
    setAssets(prev => [...prev, formData]);
    
    // Limpa e fecha
    setFormData({ ticker: '', quantity: '', price: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (indexToDelete) => {
    setAssets(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <>
      <header className="mb-10 flex justify-between items-center text-left">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resumo da Carteira</h1>
          <p className="text-slate-500 tracking-tight">Bem-vinda de volta, Júlia!</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
        >
          <Plus size={20} />
          Novo Ativo
        </button>
      </header>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <SummaryCard title="Patrimônio Total" value="R$ 45.250,00" percentage="+12.5%" positive />
        <SummaryCard title="Rendimento Mensal" value="R$ 1.120,40" percentage="+2.4%" positive />
        <SummaryCard title="Projeção 12 meses" value="R$ 52.300,00" percentage="-0.5%" />
      </div>

      {/* Seção Principal: Gráfico + Tabela */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <AssetChart />
        <InvestmentTable assets={assets} onDelete={handleDelete} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastrar Novo Ativo">
         {/* ... (Seu formulário que já funciona) ... */}
         <form className="space-y-5" onSubmit={handleSave}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Ticker</label>
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
            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-slate-800 transition-all">
              Salvar Investimento
            </button>
         </form>
      </Modal>
    </>
  );
}
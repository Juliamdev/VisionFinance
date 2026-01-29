import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AssetChart } from '../components/AssetChart';
import { Modal } from '../components/Modal';
import { SummaryCard } from '../components/SummaryCard';
import { InvestmentTable } from '../components/InvestmentTable';
import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';

export function Dashboard({session}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assets, setAssets] = useState([]); // Começa vazio
  const [formData, setFormData] = useState({ ticker: '', quantity: '', price: '' });

  //Busca dados privados
  useEffect(() => {
    const fetchInvestments = await () => {
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

  const handleSave = async (e) => {
    e.preventDefault();
    
    const newInvestment = { 
      ticker: formData.ticker, 
      quantity: Number(formData.quantity), 
      price: Number(formData.price),
      user_id: session.user.id // ASSINATURA: Vincula o dado ao usuário logado
    };

    const { data, error } = await supabase
      .from('investments')
      .insert([newInvestment]);

    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      // Atualiza a interface localmente para ser instantâneo
      setAssets(prev => [...prev, newInvestment]);
      setIsModalOpen(false);
      setFormData({ ticker: '', quantity: '', price: '' });
    }
  };

  // --- LÓGICA DE CÁLCULO  ---
  const totalPatrimonio = assets.reduce((acc, asset) => {
    // Usamos Number() para garantir que o cálculo não tente somar textos
    return acc + (Number(asset.quantity || 0) * Number(asset.price || 0));
  }, 0);

  const totalFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPatrimonio);

  // Exemplo de rendimento estimado (2.4% do total)
  const rendimentoEstimado = totalPatrimonio * 0.024;
  const rendimentoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(rendimentoEstimado);
  // 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ticker' ? value.toUpperCase() : value
    }));
  };


  const handleSave = async (e) => {
    e.preventDefault();

    // 1. Enviar para o Supabase
    const { data, error } = await supabase
      .from('investments') // Nome da tabela que criou
      .insert([
        {  
          ticker: formData.ticker, 
          quantity: Number(formData.quantity), 
          price: Number(formData.price) 
        }
      ]);

    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      // 2. Se deu certo, atualiza a tela e fecha o modal
      setAssets(prev => [...prev, formData]);
      setIsModalOpen(false);
      setFormData({ ticker: '', quantity: '', price: '' });
    }
  };

  const handleDelete = (indexToDelete) => {
    setAssets(prev => prev.filter((_, index) => index !== indexToDelete));
  };



  // Dentro da função Dashboard
  useEffect(() => {
    const fetchInvestments = async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*');

      if (data) setAssets(data);
    };

    fetchInvestments();
  }, []);

  return (
    <>
      <header className="mb-10 flex justify-between items-center text-left">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-sans">VisionFinance</h1>
          <p className="text-slate-500">Gestão inteligente para seus investimentos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Novo Ativo
        </button>
      </header>

      {/* Grid de Cards Dinâmicos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
        <SummaryCard 
          title="Patrimônio Total" 
          value={totalFormatado} 
          percentage={`+${assets.length} ativos`} 
          positive 
        />
        <SummaryCard 
          title="Projeção de Rendimento" 
          value={rendimentoFormatado} 
          percentage="2.4% a.m." 
          positive 
        />
        <SummaryCard 
          title="Ativos em Carteira" 
          value={assets.length.toString()} 
          percentage="Unidades" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <AssetChart />
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
    </>
  );
}
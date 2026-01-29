import { LayoutDashboard, PieChart, Calculator, Settings, Wallet, LogOut } from "lucide-react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export function Sidebar() {
    //O navigate é uma função de ação
    const navigate = useNavigate();
    const location = useLocation(); // Destaca o link ativo automaticamente

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut(); 
        if (error) {
            alert("Erro ao sair: " + error.message);
        } else {
            navigate('/auth');
        }
    };

    return (
        <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-6 h-screen sticky top-0">
            {/* Logo do VisionFinance */}
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="bg-slate-900 p-2 rounded-lg">
                    <Wallet className="text-white" size={20} />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">VisionFinance</span>
            </div>

            {/* Menu de Navegação */}
            <nav className="flex-1 space-y-2">
                <NavItem 
                    to="/" 
                    icon={<LayoutDashboard size={20} />} 
                    label="Dashboard" 
                    active={location.pathname === "/"} 
                />
                <NavItem 
                    to="/investimentos" 
                    icon={<PieChart size={20} />} 
                    label="Investimentos" 
                    active={location.pathname === "/investimentos"} 
                />
                <NavItem 
                    to="/simulador" 
                    icon={<Calculator size={20} />} 
                    label="Simulador" 
                    active={location.pathname === "/simulador"} 
                />
            </nav>

            {/* Rodapé da Sidebar */}
            <div className="pt-6 border-t border-slate-100 space-y-2">
                <NavItem 
                    to="/configuracoes" 
                    icon={<Settings size={20} />} 
                    label="Configurações" 
                    active={location.pathname === "/configuracoes"} 
                />
                
                {/* Botão de Logout real */}
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl font-medium transition-all"
                >
                    <LogOut size={20} />
                    Sair
                </button>
            </div>
        </aside>
    );
}

//o NavItem agora usa 'Link' para não recarregar a página
function NavItem({ icon, label, to, active = false }) {
    return (
        <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            active ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`}>
            {icon}
            {label}
        </Link>
    );
}
import { LayoutDashboard, PieChart, Calculator, Settings, Wallet } from "lucide-react";

export function Sidebar(){
    return (
        <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-6 h-screen">
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="bg-slate-900 p-2 rounded-lg">
                    <Wallet className="text-white" size={20} />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">VisionFinance</span>
            </div>

            <nav className="flex-1 space-y-2">
                <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                <NavItem icon={<PieChart size={20} />} label="Investimentos" />
                <NavItem icon={<Calculator size={20} />} label="Simulador" />
            </nav>

            <div className="pt-6 border-t border-slate-100">
                <NavItem icon={<Settings size={20} />} label="Configurações" />
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false}) {
    return (
        <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            active ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`}>
            {icon}
            {label}
        </a>
    );
}
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) alert(error.message)
    else if (isSignUp) alert('Verifique seu e-mail para confirmar o cadastro!')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 text-left">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          {isSignUp ? 'Criar Conta' : 'Bem-vinda de volta'}
        </h2>
        <p className="text-slate-500 mb-8">Gerencie seus investimentos com o VisionFinance.</p>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <input 
            type="email" placeholder="Seu e-mail" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900"
          />
          <input 
            type="password" placeholder="Sua senha" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900"
          />
          <button 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            {loading ? 'Carregando...' : isSignUp ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>
        
        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-6 text-sm text-slate-500 hover:text-slate-900 font-medium"
        >
          {isSignUp ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Crie uma agora'}
        </button>
      </div>
    </div>
  )
}
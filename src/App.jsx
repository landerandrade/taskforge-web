import {useState} from 'react'
import Login from './components/Login'
import TarefaList from './components/tarefas/TarefaList'
import ProjetoList from './components/projetos/ProjetoList'
import {Button} from '@/components/ui/button'
import {Toaster} from 'react-hot-toast'

export default function App() {
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem('token'))
  const [aba, setAba] = useState('tarefas')

  function handleLogin() { setAutenticado(true) }

  function handleLogout() {
    localStorage.removeItem('token')
    setAutenticado(false)
  }

  if (!autenticado) return (
    <>
      <Login onLogin={handleLogin} />
      <Toaster position="top-right" />
    </>
  )

  return (
    <div className="min-h-screen bg-[#0C0818]">
      <Toaster position="top-right" />

      <header className="border-b border-[#2D2750] bg-[#130F23]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-white font-bold text-xl">🔨 TaskForge</h1>
            <nav className="flex gap-1">
              <Button
                variant="ghost"
                onClick={() => setAba('tarefas')}
                className={aba === 'tarefas'
                  ? 'text-[#F97316] bg-[#F97316]/10 hover:bg-[#F97316]/15'
                  : 'text-[#9490B8] hover:text-white hover:bg-[#2D2750]'}
              >
                Tarefas
              </Button>
              <Button
                variant="ghost"
                onClick={() => setAba('projetos')}
                className={aba === 'projetos'
                  ? 'text-[#F97316] bg-[#F97316]/10 hover:bg-[#F97316]/15'
                  : 'text-[#9490B8] hover:text-white hover:bg-[#2D2750]'}
              >
                Projetos
              </Button>
            </nav>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-[#9490B8] hover:text-white hover:bg-[#2D2750]"
          >
            Sair →
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {aba === 'tarefas' ? <TarefaList /> : <ProjetoList />}
      </main>
    </div>
  )
}

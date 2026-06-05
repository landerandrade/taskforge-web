import {useState} from 'react'
import Login from './components/Login.jsx'
import TarefaList from './components/tarefas/TarefaList.jsx'

export default function App() {
  const [autenticado, setAutenticado] = useState(
    !!localStorage.getItem('token')
  )

  function handleLogin() {
    setAutenticado(true)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setAutenticado(false)
  }

  return (
    <div>
      {autenticado
        ? <TarefaList onLogout={handleLogout}/>
        : <Login onLogin={handleLogin}/>}
    </div>
  )
}

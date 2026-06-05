import {useState} from 'react';
import {login} from '../services/api.js';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      const { data } = await login(email, senha)
      localStorage.setItem('token', data.data.token)
      onLogin()
    } catch {
      setErro('Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h1>TaskForge</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Entrar</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        {erro && <p className="erro">{erro}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

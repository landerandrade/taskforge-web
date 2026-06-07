import { useState } from 'react'
import { login, registrar } from '../services/api.js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'

export default function Login({ onLogin }) {
  const [modo, setModo] = useState('login')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setCarregando(true)
    try {
      if (modo === 'login') {
        const { data } = await login(email, senha)
        localStorage.setItem('token', data.data.token)
        onLogin()
      } else {
        await registrar(nome, email, senha)
        toast.success('Conta criada! Faça login.')
        setModo('login')
        setNome('')
        setSenha('')
      }
    } catch {
      toast.error(modo === 'login' ? 'Email ou senha inválidos' : 'Erro ao criar conta')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0818] px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">🔨 TaskForge</h1>
          <p className="text-[#9490B8] mt-2">Gerencie suas tarefas com eficiência</p>
        </div>

        <Card className="bg-[#130F23] border-[#2D2750]">
          <CardHeader>
            <CardTitle className="text-white">
              {modo === 'login' ? 'Entrar na sua conta' : 'Criar conta'}
            </CardTitle>
            <CardDescription className="text-[#9490B8]">
              {modo === 'login'
                ? 'Digite suas credenciais para continuar'
                : 'Preencha os dados para criar sua conta'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {modo === 'registro' && (
                <div className="space-y-2">
                  <Label className="text-[#E2E2F0]">Nome</Label>
                  <Input
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                    className="bg-[#0C0818] border-[#2D2750] text-white placeholder:text-[#9490B8]"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-[#E2E2F0]">Email</Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-[#0C0818] border-[#2D2750] text-white placeholder:text-[#9490B8]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#E2E2F0]">Senha</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  required
                  className="bg-[#0C0818] border-[#2D2750] text-white placeholder:text-[#9490B8]"
                />
              </div>

              <Button
                type="submit"
                disabled={carregando}
                className="w-full bg-[#F97316] hover:bg-[#ea6c0a] text-white font-semibold"
              >
                {carregando
                  ? 'Aguarde...'
                  : modo === 'login' ? 'Entrar →' : 'Criar conta →'}
              </Button>

              <p className="text-center text-sm text-[#9490B8]">
                {modo === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
                <button
                  type="button"
                  onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
                  className="text-[#6C3CE0] hover:text-[#A88FF7] underline"
                >
                  {modo === 'login' ? 'Criar conta' : 'Entrar'}
                </button>
              </p>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

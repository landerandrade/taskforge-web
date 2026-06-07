import {useEffect, useState} from 'react'
import {excluirProjeto, listarProjetos} from '@/services/api.js'
import ProjetoForm from './ProjetoForm'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Pencil, Plus, Trash2} from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProjetoList() {
  const [projetos, setProjetos] = useState([])
  const [projetoEditando, setProjetoEditando] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => {
    carregarProjetos()
  }, [])

  async function carregarProjetos() {
    const { data } = await listarProjetos()
    setProjetos(data.data)
  }

  async function handleExcluir(id) {
    await excluirProjeto(id)
    toast.success('Projeto excluído!')
    carregarProjetos()
  }

  function handleEditar(projeto) {
    setProjetoEditando(projeto)
    setMostrarForm(true)
  }

  function handleNovo() {
    setProjetoEditando(null)
    setMostrarForm(true)
  }

  function handleFecharForm() {
    setProjetoEditando(null)
    setMostrarForm(false)
    carregarProjetos()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Meus Projetos</h2>
          <p className="text-[#9490B8] text-sm mt-1">
            {projetos.length} {projetos.length === 1 ? 'projeto' : 'projetos'}
          </p>
        </div>
        <Button
          onClick={handleNovo}
          className="bg-[#F97316] hover:bg-[#ea6c0a] text-white font-semibold"
        >
          <Plus className="w-4 h-4 mr-1" /> Novo projeto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projetos.map(projeto => (
          <Card key={projeto.id} className="bg-[#130F23] border-[#2D2750]">
            <CardHeader>
              <CardTitle className="text-white">{projeto.nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#9490B8] text-sm mb-4 min-h-5">
                {projeto.descricao || 'Sem descrição'}
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditar(projeto)}
                  className="text-[#9490B8] hover:text-white hover:bg-[#2D2750]"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleExcluir(projeto.id)}
                  className="text-[#9490B8] hover:text-red-400 hover:bg-[#2D2750]"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projetos.length === 0 && (
        <p className="text-center text-[#9490B8] py-12">
          Nenhum projeto ainda. Crie o primeiro!
        </p>
      )}

      {mostrarForm && (
        <ProjetoForm
          projeto={projetoEditando}
          aberto={mostrarForm}
          onFechar={handleFecharForm}
        />
      )}
    </div>
  )
}

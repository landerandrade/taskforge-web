import {useEffect, useState} from 'react'
import {excluirTarefa, listarProjetos, listarTarefas} from '@/services/api.js'
import TarefaForm from './TarefaForm'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {FolderOpen, Pencil, Plus, Trash2} from 'lucide-react'
import toast from 'react-hot-toast'

const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída'
}

const STATUS_STYLE = {
  PENDENTE: 'bg-[#F97316]/15 text-[#F97316] border-[#F97316]/30',
  EM_ANDAMENTO: 'bg-[#6C3CE0]/15 text-[#A88FF7] border-[#6C3CE0]/30',
  CONCLUIDA: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
}

export default function TarefaList() {
  const [tarefas, setTarefas] = useState([])
  const [projetos, setProjetos] = useState([])
  const [filtroStatus, setFiltroStatus] = useState('TODOS')
  const [tarefaEditando, setTarefaEditando] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => {
    carregarTarefas()
    carregarProjetos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroStatus])

  async function carregarTarefas() {
    const status = filtroStatus === 'TODOS' ? undefined : filtroStatus
    const { data } = await listarTarefas(status)
    setTarefas(data.data.content)
  }

  async function carregarProjetos() {
    const { data } = await listarProjetos()
    setProjetos(data.data)
  }

  async function handleExcluir(id) {
    await excluirTarefa(id)
    toast.success('Tarefa excluída!')
    carregarTarefas()
  }

  function handleEditar(tarefa) {
    setTarefaEditando(tarefa)
    setMostrarForm(true)
  }

  function handleNova() {
    setTarefaEditando(null)
    setMostrarForm(true)
  }

  function handleFecharForm() {
    setTarefaEditando(null)
    setMostrarForm(false)
    carregarTarefas()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Minhas Tarefas</h2>
          <p className="text-[#9490B8] text-sm mt-1">
            {tarefas.length} {tarefas.length === 1 ? 'tarefa encontrada' : 'tarefas encontradas'}
          </p>
        </div>
        <Button
          onClick={handleNova}
          className="bg-[#F97316] hover:bg-[#ea6c0a] text-white font-semibold"
        >
          <Plus className="w-4 h-4 mr-1" /> Nova tarefa
        </Button>
      </div>

      <div className="mb-6 w-56">
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="bg-[#130F23] border-[#2D2750] text-white">
            <SelectValue placeholder="Todos os status">
              {filtroStatus === 'TODOS' ? 'Todos os status' : STATUS_LABEL[filtroStatus]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[#130F23] border-[#2D2750] text-white">
            <SelectItem value="TODOS">Todos os status</SelectItem>
            <SelectItem value="PENDENTE">Pendente</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em andamento</SelectItem>
            <SelectItem value="CONCLUIDA">Concluída</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {tarefas.map(tarefa => (
          <Card key={tarefa.id} className="bg-[#130F23] border-[#2D2750]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white font-semibold">{tarefa.titulo}</h3>
                {tarefa.descricao && (
                  <p className="text-[#9490B8] text-sm mt-1">{tarefa.descricao}</p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className={STATUS_STYLE[tarefa.status]}>
                    {STATUS_LABEL[tarefa.status]}
                  </Badge>
                  {tarefa.projetoNome && (
                    <span className="text-[#9490B8] text-xs flex items-center gap-1">
                        <FolderOpen className="w-3 h-3" /> {tarefa.projetoNome}
                      </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditar(tarefa)}
                  className="text-[#9490B8] hover:text-white hover:bg-[#2D2750]"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleExcluir(tarefa.id)}
                  className="text-[#9490B8] hover:text-red-400 hover:bg-[#2D2750]"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tarefas.length === 0 && (
        <p className="text-center text-[#9490B8] py-12">
          Nenhuma tarefa encontrada. Crie a primeira!
        </p>
      )}

      {mostrarForm && (
        <TarefaForm
          tarefa={tarefaEditando}
          projetos={projetos}
          aberto={mostrarForm}
          onFechar={handleFecharForm}
        />
      )}
    </div>
  )
}

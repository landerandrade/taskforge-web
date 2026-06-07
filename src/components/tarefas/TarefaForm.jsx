import {useState} from 'react'
import {atualizarTarefa, criarTarefa} from '@/services/api.js'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import toast from 'react-hot-toast'

const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída'
}

export default function TarefaForm({ tarefa, projetos, aberto, onFechar }) {
  const [titulo, setTitulo] = useState(tarefa?.titulo || '')
  const [descricao, setDescricao] = useState(tarefa?.descricao || '')
  const [status, setStatus] = useState(tarefa?.status || 'PENDENTE')
  const [projetoId, setProjetoId] = useState(
    tarefa?.projetoId ? String(tarefa.projetoId) : 'NENHUM'
  )

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const body = {
        titulo,
        descricao,
        status,
        projetoId: projetoId === 'NENHUM' ? null : Number(projetoId)
      }
      if (tarefa) {
        await atualizarTarefa({ id: tarefa.id, ...body })
      } else {
        await criarTarefa(body)
      }
      toast.success(tarefa ? 'Tarefa atualizada!' : 'Tarefa criada!')
      onFechar()
    } catch {
      toast.error('Erro ao salvar tarefa')
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent className="bg-[#130F23] border-[#2D2750] text-white">
        <DialogHeader>
          <DialogTitle>{tarefa ? 'Editar tarefa' : 'Nova tarefa'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#E2E2F0]">Título *</Label>
            <Input
              placeholder="Ex: Implementar autenticação"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
              className="bg-[#0C0818] border-[#2D2750] text-white placeholder:text-[#9490B8]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#E2E2F0]">Descrição</Label>
            <Textarea
              placeholder="Descreva a tarefa (opcional)"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="bg-[#0C0818] border-[#2D2750] text-white placeholder:text-[#9490B8]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#E2E2F0]">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-[#0C0818] border-[#2D2750] text-white">
                  <SelectValue>{STATUS_LABEL[status]}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-[#130F23] border-[#2D2750] text-white">
                  <SelectItem value="PENDENTE">Pendente</SelectItem>
                  <SelectItem value="EM_ANDAMENTO">Em andamento</SelectItem>
                  <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#E2E2F0]">Projeto</Label>
              <Select value={projetoId} onValueChange={setProjetoId}>
                <SelectTrigger className="bg-[#0C0818] border-[#2D2750] text-white">
                  <SelectValue>
                    {projetoId === 'NENHUM'
                      ? 'Sem projeto'
                      : projetos.find(p => String(p.id) === projetoId)?.nome}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-[#130F23] border-[#2D2750] text-white">
                  <SelectItem value="NENHUM">Sem projeto</SelectItem>
                  {projetos.map(p => (
                    <SelectItem key={p.id} value={String(p.id)}>{p.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onFechar}
              className="text-[#9490B8] hover:text-white hover:bg-[#2D2750]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#F97316] hover:bg-[#ea6c0a] text-white font-semibold"
            >
              {tarefa ? 'Salvar' : 'Criar tarefa'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

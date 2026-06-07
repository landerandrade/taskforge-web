import {useState} from 'react'
import {atualizarProjeto, criarProjeto} from '@/services/api.js'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import toast from 'react-hot-toast'

export default function ProjetoForm({ projeto, aberto, onFechar }) {
  const [nome, setNome] = useState(projeto?.nome || '')
  const [descricao, setDescricao] = useState(projeto?.descricao || '')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const body = { nome, descricao }
      if (projeto) {
        await atualizarProjeto({ id: projeto.id, ...body })
      } else {
        await criarProjeto(body)
      }
      toast.success(projeto ? 'Projeto atualizado!' : 'Projeto criado!')
      onFechar()
    } catch {
      toast.error('Erro ao salvar projeto')
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent className="bg-[#130F23] border-[#2D2750] text-white">
        <DialogHeader>
          <DialogTitle>{projeto ? 'Editar projeto' : 'Novo projeto'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#E2E2F0]">Nome *</Label>
            <Input
              placeholder="Ex: TaskForge API"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              className="bg-[#0C0818] border-[#2D2750] text-white placeholder:text-[#9490B8]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#E2E2F0]">Descrição</Label>
            <Textarea
              placeholder="Descreva o projeto (opcional)"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="bg-[#0C0818] border-[#2D2750] text-white placeholder:text-[#9490B8]"
            />
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
              {projeto ? 'Salvar' : 'Criar projeto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

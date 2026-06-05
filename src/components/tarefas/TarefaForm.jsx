import {useState} from 'react';
import {atualizarTarefa, criarTarefa} from '../../services/api.js';
import toast from 'react-hot-toast';

export default function TarefaForm({ tarefa, projetos, onFechar }) {
  const [titulo, setTitulo] = useState(tarefa?.titulo || '')
  const [descricao, setDescricao] = useState(tarefa?.descricao || '')
  const [projetoId, setProjetoId] = useState(tarefa?.projetoId || '')
  const [status, setStatus] = useState(tarefa?.status || 'PENDENTE')
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    try {
      const body = { titulo, descricao, projetoId: projetoId || null, status }
      if (tarefa) {
        await atualizarTarefa({ id: tarefa.id, ...body })
      } else {
        await criarTarefa(body)
      }
      toast.success(tarefa ? 'Tarefa atualizada!' : 'Tarefa criada!')
      onFechar()
    } catch {
      toast.error('Erro ao salvar tarefa')
      setErro('')
    }
  }

  return (
    <div className="form-overlay">
      <form onSubmit={handleSubmit} className="tarefa-form">
        <h2>{tarefa ? 'Editar tarefa' : 'Nova tarefa'}</h2>

        <input
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        {tarefa &&
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDA">Concluída</option>
          </select>
        }
        
        <select value={projetoId} onChange={e => setProjetoId(e.target.value)}>
          <option value="">Sem projeto</option>
          {projetos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        {erro && <p className="erro">{erro}</p>}

        <div className="form-acoes">
          <button type="button" onClick={onFechar}>Cancelar</button>
          <button type="submit">{tarefa ? 'Salvar' : 'Criar'}</button>
        </div>
      </form>
    </div>
  )
}

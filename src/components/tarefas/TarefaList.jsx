import {useEffect, useState} from 'react';
import {excluirTarefa, listarProjetos, listarTarefas} from '../../services/api.js';
import TarefaForm from './TarefaForm';
import toast from 'react-hot-toast';

const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída'
}

export default function TarefaList({ onLogout }) {
  const [tarefas, setTarefas] = useState([])
  const [projetos, setProjetos] = useState([])
  const [filtroStatus, setFiltroStatus] = useState('')
  const [tarefaEditando, setTarefaEditando] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => {
    carregarTarefas();
    carregarProjetos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroStatus])

  async function carregarTarefas() {
    const { data } = await listarTarefas(filtroStatus || undefined);
    setTarefas(data.data.content)
  }

  async function carregarProjetos() {
    const { data } = await listarProjetos()
    setProjetos(data.data)
  }

  async function handleExcluir(id) {
    await excluirTarefa(id)
    carregarTarefas()
    toast.success('Tarefa excluída!')
  }

  function handleEditar(tarefa) {
    setTarefaEditando(tarefa)
    setMostrarForm(true)
  }

  function handleFecharForm() {
    setTarefaEditando(null)
    setMostrarForm(false)
    carregarTarefas()
  }

  return (
    <div className="container">
      <header>
        <h1>TaskForge</h1>
        <button onClick={onLogout}>Sair</button>
      </header>

      <div className="toolbar">
        <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="">Todos os status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANDAMENTO">Em andamento</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>
        <button onClick={() => setMostrarForm(true)}>Nova tarefa</button>
      </div>

      {mostrarForm && (
        <TarefaForm
          tarefa={tarefaEditando}
          projetos={projetos}
          onFechar={handleFecharForm}
        />
      )}

      <ul className="tarefa-list">
        {tarefas.map(tarefa => (
          <li key={tarefa.id} className="tarefa-item">
            <div>
              <strong>{tarefa.titulo}</strong>
              <span className={`status ${tarefa.status.toLowerCase()}`}>
                  {STATUS_LABEL[tarefa.status]}
                </span>
              {tarefa.projetoNome && <small>{tarefa.projetoNome}</small>}
            </div>
            <div className="acoes">
              <button onClick={() => handleEditar(tarefa)}>Editar</button>
              <button onClick={() => handleExcluir(tarefa.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export const login = (email, senha) => {
  return api.post('/auth/login', { email, senha });
}

export const registrar = (nome, email, senha) => {
  return api.post('/auth/registro', { nome, email, senha })
}

export const listarTarefas = (status, projetoId) => {
  return api.get('/tarefas', { params: { status, projetoId } })
}

export const criarTarefa = (tarefa) => {
  return api.post('/tarefas', tarefa);
}

export const atualizarTarefa = (tarefa) => {
  return api.put(`/tarefas/${tarefa.id}`, tarefa);
}

export const excluirTarefa = (tarefaId) => {
  return api.delete(`/tarefas/${tarefaId}`);
}

export const listarProjetos = () => {
  return api.get('/projetos');
}

export const criarProjeto = (projeto) => {
  return api.post('/projetos', projeto);
}

export const atualizarProjeto = (projeto) => {
  return api.put(`/projetos/${projeto.id}`, projeto);
}

export const excluirProjeto = (projetoId) => {
  return api.delete(`/projetos/${projetoId}`);
}

export default api;

const { v4: uuidv4 } = require('uuid');
const agentesRepository = require('../repositories/agentesRepository');

// Lista todos os agentes
function listarAgentes(req, res) {
  const agentes = agentesRepository.listar();
  res.status(200).json(agentes);
}

// Busca um agente por ID
function buscarAgentePorId(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.buscarPorId(id);

  if (!agente) {
    return res.status(404).json({ mensagem: 'Agente não encontrado' });
  }

  res.status(200).json(agente);
}

// Cria um novo agente
function criarAgente(req, res) {
  const { nome, identificacao, status } = req.body;

  if (!nome || !identificacao || !status) {
    return res.status(400).json({ mensagem: 'Campos nome, identificacao e status são obrigatórios' });
  }

  const statusValido = ['ativo', 'inativo'].includes(status.toLowerCase());
  if (!statusValido) {
    return res.status(400).json({ mensagem: 'Status deve ser "ativo" ou "inativo"' });
  }

  const novoAgente = {
    id: uuidv4(),
    nome,
    identificacao,
    status: status.toLowerCase()
  };

  agentesRepository.criar(novoAgente);
  res.status(201).json(novoAgente);
}

// Atualiza totalmente um agente
function atualizarAgente(req, res) {
  const { id } = req.params;
  const { nome, identificacao, status } = req.body;

  const agenteExistente = agentesRepository.buscarPorId(id);
  if (!agenteExistente) {
    return res.status(404).json({ mensagem: 'Agente não encontrado' });
  }

  if (!nome || !identificacao || !status) {
    return res.status(400).json({ mensagem: 'Campos nome, identificacao e status são obrigatórios' });
  }

  const statusValido = ['ativo', 'inativo'].includes(status.toLowerCase());
  if (!statusValido) {
    return res.status(400).json({ mensagem: 'Status deve ser "ativo" ou "inativo"' });
  }

  const agenteAtualizado = {
    id,
    nome,
    identificacao,
    status: status.toLowerCase()
  };

  agentesRepository.atualizar(id, agenteAtualizado);
  res.status(200).json(agenteAtualizado);
}

// Atualiza parcialmente um agente
function atualizarParcialAgente(req, res) {
  const { id } = req.params;
  const dadosAtualizacao = req.body;

  const agenteExistente = agentesRepository.buscarPorId(id);
  if (!agenteExistente) {
    return res.status(404).json({ mensagem: 'Agente não encontrado' });
  }

  if (dadosAtualizacao.status && !['ativo', 'inativo'].includes(dadosAtualizacao.status.toLowerCase())) {
    return res.status(400).json({ mensagem: 'Status deve ser "ativo" ou "inativo"' });
  }

  const agenteAtualizado = agentesRepository.atualizarParcial(id, dadosAtualizacao);
  res.status(200).json(agenteAtualizado);
}

// Remove um agente
function deletarAgente(req, res) {
  const { id } = req.params;

  const agenteExistente = agentesRepository.buscarPorId(id);
  if (!agenteExistente) {
    return res.status(404).json({ mensagem: 'Agente não encontrado' });
  }

  agentesRepository.deletar(id);
  res.status(204).send();
}

module.exports = {
  listarAgentes,
  buscarAgentePorId,
  criarAgente,
  atualizarAgente,
  atualizarParcialAgente,
  deletarAgente
};

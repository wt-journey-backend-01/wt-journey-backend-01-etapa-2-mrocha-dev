const { findAll, findById, create, update, patch, remove } = require('../repositories/agentesRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { validationResult } = require('express-validator');

function listarAgentes(req, res) {
  const agentes = findAll();
  res.status(200).json(agentes);
}

function buscarAgentePorId(req, res) {
  const { id } = req.params;
  const agente = findById(id);

  if (!agente) return res.status(404).json({ mensagem: 'Agente não encontrado.' });

  res.status(200).json(agente);
}

function cadastrarAgente(req, res) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });

  const novoAgente = create(req.body);
  res.status(201).json(novoAgente);
}

function atualizarAgente(req, res) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });

  const { id } = req.params;
  const atualizado = update(id, req.body);
  if (!atualizado) return res.status(404).json({ mensagem: 'Agente não encontrado.' });

  res.status(200).json(atualizado);
}

function atualizarParcialAgente(req, res) {
  const { id } = req.params;
  const atualizado = patch(id, req.body);
  if (!atualizado) return res.status(404).json({ mensagem: 'Agente não encontrado.' });

  res.status(200).json(atualizado);
}

function deletarAgente(req, res) {
  const { id } = req.params;
  const deletado = remove(id);
  if (!deletado) return res.status(404).json({ mensagem: 'Agente não encontrado.' });

  res.status(204).send();
}

module.exports = {
  listarAgentes,
  buscarAgentePorId,
  cadastrarAgente,
  atualizarAgente,
  atualizarParcialAgente,
  deletarAgente,
};

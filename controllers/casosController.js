const { validationResult } = require('express-validator');
const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function listarCasos(req, res) {
  const { agente_id, status, q } = req.query;
  let casos = casosRepository.findAll();

  if (agente_id) casos = casos.filter(c => c.agente_id === agente_id);
  if (status) casos = casos.filter(c => c.status === status);
  if (q) casos = casos.filter(c => c.descricao.toLowerCase().includes(q.toLowerCase()));

  res.status(200).json(casos);
}

function buscarCasoPorId(req, res) {
  const caso = casosRepository.findById(req.params.id);
  if (!caso) return res.status(404).json({ message: 'Caso não encontrado' });
  res.status(200).json(caso);
}

function cadastrarCaso(req, res) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ errors: erros.array() });

  const { agente_id } = req.body;
  const agente = agentesRepository.findById(agente_id);
  if (!agente) return res.status(404).json({ message: 'Agente responsável não encontrado' });

  const novoCaso = { id: uuidv4(), ...req.body };
  casosRepository.create(novoCaso);
  res.status(201).json(novoCaso);
}

function atualizarCaso(req, res) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ errors: erros.array() });

  const atualizado = casosRepository.update(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ message: 'Caso não encontrado' });
  res.status(200).json(atualizado);
}

function atualizarParcialCaso(req, res) {
  const atualizado = casosRepository.update(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ message: 'Caso não encontrado' });
  res.status(200).json(atualizado);
}

function deletarCaso(req, res) {
  const removido = casosRepository.remove(req.params.id);
  if (!removido) return res.status(404).json({ message: 'Caso não encontrado' });
  res.status(204).send();
}

function buscarAgenteDoCaso(req, res) {
  const caso = casosRepository.findById(req.params.caso_id);
  if (!caso) return res.status(404).json({ message: 'Caso não encontrado' });

  const agente = agentesRepository.findById(caso.agente_id);
  if (!agente) return res.status(404).json({ message: 'Agente não encontrado' });

  res.status(200).json(agente);
}

module.exports = {
  listarCasos,
  buscarCasoPorId,
  cadastrarCaso,
  atualizarCaso,
  atualizarParcialCaso,
  deletarCaso,
  buscarAgenteDoCaso
};

const {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
  findCasosByAgenteId,
} = require('../repositories/agentesRepository');
const { validationResult } = require('express-validator');

async function listarAgentes(req, res) {
  try {
    const agentes = await findAll();
    res.status(200).json(agentes);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar agentes.', error: error.message });
  }
}

async function buscarAgentePorId(req, res) {
  try {
    const { id } = req.params;
    const agente = await findById(id);
    if (!agente) return res.status(404).json({ mensagem: 'Agente não encontrado.' });
    res.status(200).json(agente);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar agente.', error: error.message });
  }
}

async function cadastrarAgente(req, res) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });

  try {
    const novoAgente = await create(req.body);
    res.status(201).json(novoAgente);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar agente.', error: error.message });
  }
}

async function atualizarAgente(req, res) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });

  try {
    const { id } = req.params;
    const atualizado = await update(id, req.body);
    if (!atualizado) return res.status(404).json({ mensagem: 'Agente não encontrado.' });
    res.status(200).json(atualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar agente.', error: error.message });
  }
}

async function atualizarParcialAgente(req, res) {
  try {
    const { id } = req.params;
    const atualizado = await patch(id, req.body);
    if (!atualizado) return res.status(404).json({ mensagem: 'Agente não encontrado.' });
    res.status(200).json(atualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar parcialmente agente.', error: error.message });
  }
}

async function deletarAgente(req, res) {
  try {
    const { id } = req.params;
    const deletado = await remove(id);
    if (!deletado) return res.status(404).json({ mensagem: 'Agente não encontrado.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar agente.', error: error.message });
  }
}

async function listarCasosDoAgente(req, res) {
  try {
    const { id } = req.params;
    const agente = await findById(id);
    if (!agente) return res.status(404).json({ mensagem: 'Agente não encontrado.' });
    const casos = await findCasosByAgenteId(id);
    res.status(200).json(casos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar casos do agente.', error: error.message });
  }
}

module.exports = {
  listarAgentes,
  buscarAgentePorId,
  cadastrarAgente,
  atualizarAgente,
  atualizarParcialAgente,
  deletarAgente,
  listarCasosDoAgente,
};

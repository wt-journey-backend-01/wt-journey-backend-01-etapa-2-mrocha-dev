const {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
} = require('../repositories/casosRepository');
const { validationResult } = require('express-validator');

async function listarCasos(req, res) {
  try {
    const casos = await findAll();
    res.status(200).json(casos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar casos.', error: error.message });
  }
}

async function buscarCasoPorId(req, res) {
  try {
    const { id } = req.params;
    const caso = await findById(id);
    if (!caso) return res.status(404).json({ mensagem: 'Caso não encontrado.' });
    res.status(200).json(caso);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar caso.', error: error.message });
  }
}

async function cadastrarCaso(req, res) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });

  try {
    const novoCaso = await create(req.body);
    res.status(201).json(novoCaso);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar caso.', error: error.message });
  }
}

async function atualizarCaso(req, res) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });

  try {
    const { id } = req.params;
    const atualizado = await update(id, req.body);
    if (!atualizado) return res.status(404).json({ mensagem: 'Caso não encontrado.' });
    res.status(200).json(atualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar caso.', error: error.message });
  }
}

async function atualizarParcialCaso(req, res) {
  try {
    const { id } = req.params;
    const atualizado = await patch(id, req.body);
    if (!atualizado) return res.status(404).json({ mensagem: 'Caso não encontrado.' });
    res.status(200).json(atualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar parcialmente caso.', error: error.message });
  }
}

async function deletarCaso(req, res) {
  try {
    const { id } = req.params;
    const deletado = await remove(id);
    if (!deletado) return res.status(404).json({ mensagem: 'Caso não encontrado.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar caso.', error: error.message });
  }
}

async function buscarAgenteDoCaso(req, res) {
  const { caso_id } = req.params;

  try {
    const agente = await db('agentes')
      .join('casos', 'agentes.id', '=', 'casos.agente_id')
      .select('agentes.*')
      .where('casos.id', caso_id)
      .first();

    if (!agente) {
      return res.status(404).json({ mensagem: 'Agente não encontrado para esse caso.' });
    }

    res.status(200).json(agente);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar agente do caso.', error: error.message });
  }
}

module.exports = {
  listarCasos,
  buscarCasoPorId,
  cadastrarCaso,
  atualizarCaso,
  atualizarParcialCaso,
  deletarCaso,
  buscarAgenteDoCaso,
};

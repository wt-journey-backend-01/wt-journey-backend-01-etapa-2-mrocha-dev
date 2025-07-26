const { v4: uuidv4 } = require('uuid');
const AgenteRepository = require('../repositories/agenteRepository');
const validarAgente = require('../validators/validarAgente');

// Listar todos os agentes
function listarAgentes(req, res, next) {
  try {
    const agentes = AgenteRepository.listar();
    res.status(200).json(agentes);
  } catch (err) {
    next(err); // envia para o errorHandler
  }
}

// Buscar agente por ID
function buscarAgentePorId(req, res, next) {
  try {
    const { id } = req.params;
    const agente = AgenteRepository.buscarPorId(id);

    if (!agente) {
      const erro = new Error('Agente não encontrado.');
      erro.statusCode = 404;
      throw erro;
    }

    res.status(200).json(agente);
  } catch (err) {
    next(err);
  }
}

// Criar novo agente
function criarAgente(req, res, next) {
  try {
    const dados = req.body;

    const { valido, erros } = validarAgente(dados);
    if (!valido) {
      const erro = new Error('Dados inválidos.');
      erro.statusCode = 400;
      erro.details = erros;
      throw erro;
    }

    const novoAgente = {
      id: uuidv4(),
      ...dados
    };

    AgenteRepository.criar(novoAgente);
    res.status(201).json(novoAgente);
  } catch (err) {
    next(err);
  }
}

// Atualizar agente (PUT)
function atualizarAgente(req, res, next) {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    const agenteExistente = AgenteRepository.buscarPorId(id);
    if (!agenteExistente) {
      const erro = new Error('Agente não encontrado.');
      erro.statusCode = 404;
      throw erro;
    }

    const { valido, erros } = validarAgente(dadosAtualizados);
    if (!valido) {
      const erro = new Error('Dados inválidos.');
      erro.statusCode = 400;
      erro.details = erros;
      throw erro;
    }

    const agenteAtualizado = { ...agenteExistente, ...dadosAtualizados };
    AgenteRepository.atualizar(id, agenteAtualizado);

    res.status(200).json(agenteAtualizado);
  } catch (err) {
    next(err);
  }
}

// Atualização parcial (PATCH)
function atualizarParcialAgente(req, res, next) {
  try {
    const { id } = req.params;
    const dadosParciais = req.body;

    const agenteExistente = AgenteRepository.buscarPorId(id);
    if (!agenteExistente) {
      const erro = new Error('Agente não encontrado.');
      erro.statusCode = 404;
      throw erro;
    }

    const agenteAtualizado = { ...agenteExistente, ...dadosParciais };
    AgenteRepository.atualizar(id, agenteAtualizado);

    res.status(200).json(agenteAtualizado);
  } catch (err) {
    next(err);
  }
}

// Remover agente
function removerAgente(req, res, next) {
  try {
    const { id } = req.params;
    const removido = AgenteRepository.remover(id);

    if (!removido) {
      const erro = new Error('Agente não encontrado para remoção.');
      erro.statusCode = 404;
      throw erro;
    }

    res.status(204).send(); // Sem conteúdo
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listarAgentes,
  buscarAgentePorId,
  criarAgente,
  atualizarAgente,
  atualizarParcialAgente,
  removerAgente
};

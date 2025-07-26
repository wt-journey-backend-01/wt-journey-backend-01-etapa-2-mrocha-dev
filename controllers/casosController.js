const { v4: uuidv4 } = require('uuid');
const {
  listarCasos,
  buscarCasoPorId,
  criarCaso,
  atualizarCaso,
  atualizarParcialCaso,
  deletarCaso
} = require('../repositories/casosRepository');
const { validarCaso } = require('../validators/validarCaso');

// Listar todos os casos
function obterTodosCasos(req, res) {
  const casos = listarCasos();
  res.json(casos);
}

// Buscar caso por ID
function obterCasoPorId(req, res) {
  const { id } = req.params;
  const caso = buscarCasoPorId(id);
  if (!caso) {
    return res.status(404).json({ mensagem: 'Caso não encontrado.' });
  }
  res.json(caso);
}

// Criar novo caso
function criarNovoCaso(req, res) {
  const dados = req.body;
  const erros = validarCaso(dados);

  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  const novoCaso = {
    id: uuidv4(),
    ...dados
  };

  criarCaso(novoCaso);
  res.status(201).json(novoCaso);
}

// Atualizar caso (PUT)
function atualizarCasoPorId(req, res) {
  const { id } = req.params;
  const dados = req.body;
  const casoExistente = buscarCasoPorId(id);

  if (!casoExistente) {
    return res.status(404).json({ mensagem: 'Caso não encontrado.' });
  }

  const erros = validarCaso(dados);
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  const casoAtualizado = atualizarCaso(id, dados);
  res.json(casoAtualizado);
}

// Atualizar parcialmente caso (PATCH)
function atualizarParcialCasoPorId(req, res) {
  const { id } = req.params;
  const dados = req.body;
  const casoExistente = buscarCasoPorId(id);

  if (!casoExistente) {
    return res.status(404).json({ mensagem: 'Caso não encontrado.' });
  }

  const casoAtualizado = atualizarParcialCaso(id, dados);
  res.json(casoAtualizado);
}

// Deletar caso
function deletarCasoPorId(req, res) {
  const { id } = req.params;
  const sucesso = deletarCaso(id);

  if (!sucesso) {
    return res.status(404).json({ mensagem: 'Caso não encontrado.' });
  }

  res.status(204).send();
}

module.exports = {
  obterTodosCasos,
  obterCasoPorId,
  criarNovoCaso,
  atualizarCasoPorId,
  atualizarParcialCasoPorId,
  deletarCasoPorId
};

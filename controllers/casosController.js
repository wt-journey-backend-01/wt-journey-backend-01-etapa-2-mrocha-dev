const casosRepository = require('../repositories/casosRepository');

function validarCaso(caso) {
  const { titulo, descricao, status, data } = caso;
  if (!titulo || !descricao || !status || !data) {
    return 'Todos os campos (titulo, descricao, status, data) são obrigatórios.';
  }

  const statusPermitidos = ['aberto', 'em andamento', 'fechado'];
  if (!statusPermitidos.includes(status.toLowerCase())) {
    return 'Status inválido. Use: "aberto", "em andamento" ou "fechado".';
  }

  if (isNaN(Date.parse(data))) {
    return 'Data inválida. Use o formato AAAA-MM-DD.';
  }

  return null;
}

function listarCasos(req, res) {
  const casos = casosRepository.listarCasos();
  res.json(casos);
}

function buscarCasoPorId(req, res) {
  const caso = casosRepository.encontrarCasoPorId(req.params.id);
  if (!caso) {
    return res.status(404).json({ mensagem: 'Caso não encontrado.' });
  }
  res.json(caso);
}

function criarCaso(req, res) {
  const erro = validarCaso(req.body);
  if (erro) {
    return res.status(400).json({ mensagem: erro });
  }
  const novoCaso = casosRepository.criarCaso(req.body);
  res.status(201).json(novoCaso);
}

function atualizarCaso(req, res) {
  const erro = validarCaso(req.body);
  if (erro) {
    return res.status(400).json({ mensagem: erro });
  }
  const casoAtualizado = casosRepository.atualizarCaso(req.params.id, req.body);
  if (!casoAtualizado) {
    return res.status(404).json({ mensagem: 'Caso não encontrado.' });
  }
  res.json(casoAtualizado);
}

function atualizarParcialmenteCaso(req, res) {
  const camposPermitidos = ['titulo', 'descricao', 'status', 'data'];
  const camposAtualizados = Object.keys(req.body);
  const camposInvalidos = camposAtualizados.filter(campo => !camposPermitidos.includes(campo));
  if (camposInvalidos.length > 0) {
    return res.status(400).json({ mensagem: `Campos inválidos: ${camposInvalidos.join(', ')}` });
  }

  if (req.body.status) {
    const statusPermitidos = ['aberto', 'em andamento', 'fechado'];
    if (!statusPermitidos.includes(req.body.status.toLowerCase())) {
      return res.status(400).json({ mensagem: 'Status inválido. Use: "aberto", "em andamento" ou "fechado".' });
    }
  }

  if (req.body.data && isNaN(Date.parse(req.body.data))) {
    return res.status(400).json({ mensagem: 'Data inválida. Use o formato AAAA-MM-DD.' });
  }

  const casoAtualizado = casosRepository.atualizarParcialmenteCaso(req.params.id, req.body);
  if (!casoAtualizado) {
    return res.status(404).json({ mensagem: 'Caso não encontrado.' });
  }
  res.json(casoAtualizado);
}

function deletarCaso(req, res) {
  const deletado = casosRepository.deletarCaso(req.params.id);
  if (!deletado) {
    return res.status(404).json({ mensagem: 'Caso não encontrado.' });
  }
  res.status(204).send(); // No Content
}

module.exports = {
  listarCasos,
  buscarCasoPorId,
  criarCaso,
  atualizarCaso,
  atualizarParcialmenteCaso,
  deletarCaso
};

const { v4: uuidv4 } = require('uuid');

let casos = [];

function listarCasos() {
  return casos;
}

function encontrarCasoPorId(id) {
  return casos.find(caso => caso.id === id);
}

function criarCaso({ titulo, descricao, status, data }) {
  const novoCaso = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    data
  };
  casos.push(novoCaso);
  return novoCaso;
}

function atualizarCaso(id, novosDados) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index === -1) return null;
  casos[index] = { ...casos[index], ...novosDados };
  return casos[index];
}

function atualizarParcialmenteCaso(id, novosCampos) {
  const caso = encontrarCasoPorId(id);
  if (!caso) return null;
  Object.assign(caso, novosCampos);
  return caso;
}

function deletarCaso(id) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index === -1) return false;
  casos.splice(index, 1);
  return true;
}

module.exports = {
  listarCasos,
  encontrarCasoPorId,
  criarCaso,
  atualizarCaso,
  atualizarParcialmenteCaso,
  deletarCaso
};

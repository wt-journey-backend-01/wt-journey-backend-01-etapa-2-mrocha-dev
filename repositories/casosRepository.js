const { v4: uuidv4 } = require('uuid');

let casos = [];

function listar() {
  return casos;
}

function buscarPorId(id) {
  return casos.find(caso => caso.id === id);
}

function criar(caso) {
  casos.push(caso);
  return caso;
}

function atualizar(id, dadosAtualizados) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index !== -1) {
    casos[index] = dadosAtualizados; // Substituição direta
    return casos[index];
  }
  return null;
}

function atualizarParcial(id, dadosParciais) {
  const caso = buscarPorId(id);
  if (!caso) return null;
  Object.assign(caso, dadosParciais);
  return caso;
}

function deletar(id) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index === -1) return false;
  casos.splice(index, 1);
  return true;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  atualizarParcial,
  deletar
};

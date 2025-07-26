const { v4: uuidv4 } = require('uuid');

let agentes = [];

function listar() {
  return agentes;
}

function buscarPorId(id) {
  return agentes.find(agente => agente.id === id);
}

function criar(agente) {
  agentes.push(agente);
  return agente;
}

function atualizar(id, novosDados) {
  const agente = buscarPorId(id);
  if (!agente) return null;
  Object.assign(agente, novosDados);
  return agente;
}

function atualizarParcial(id, dadosParciais) {
  const agente = buscarPorId(id);
  if (!agente) return null;
  Object.assign(agente, dadosParciais);
  return agente;
}

function deletar(id) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index === -1) return false;
  agentes.splice(index, 1);
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

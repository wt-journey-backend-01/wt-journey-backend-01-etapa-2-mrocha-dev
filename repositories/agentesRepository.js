const { v4: uuidv4 } = require('uuid');

const agentes = [
  {
    id: uuidv4(),
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992-10-04",
    cargo: "delegado"
  },
  // outros agentes de exemplo
];

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(agente => agente.id === id);
}

function create(data) {
  const novoAgente = { id: uuidv4(), ...data };
  agentes.push(novoAgente);
  return novoAgente;
}

function update(id, data) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index === -1) return null;
  agentes[index] = { id, ...data };
  return agentes[index];
}

function patch(id, data) {
  const agente = findById(id);
  if (!agente) return null;
  Object.assign(agente, data);
  return agente;
}

function remove(id) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index === -1) return false;
  agentes.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, create, update, patch, remove };

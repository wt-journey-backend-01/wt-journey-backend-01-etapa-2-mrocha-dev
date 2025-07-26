// repositories/agenteRepository.js
const { v4: uuidv4 } = require('uuid');

let agentes = [];

function listarAgentes() {
  return agentes;
}

function buscarAgentePorId(id) {
  return agentes.find(agente => agente.id === id);
}

function criarAgente(agente) {
  const novoAgente = { id: uuidv4(), ...agente };
  agentes.push(novoAgente);
  return novoAgente;
}

function atualizarAgente(id, dadosAtualizados) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    agentes[index] = { ...agentes[index], ...dadosAtualizados };
    return agentes[index];
  }
  return null;
}

function deletarAgente(id) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    agentes.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  listarAgentes,
  buscarAgentePorId,
  criarAgente,
  atualizarAgente,
  deletarAgente
};

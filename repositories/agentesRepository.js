const { v4: uuidv4 } = require('uuid');

let agentes = [];

function listarAgentes() {
  return agentes;
}

function obterAgentePorId(id) {
  return agentes.find(a => a.id === id);
}

function criarAgente({ nome, matricula, cargo, dataDeIncorporacao, disponivel }) {
  const novoAgente = {
    id: uuidv4(),
    nome,
    matricula,
    cargo,
    dataDeIncorporacao,
    disponivel: disponivel ?? true,
  };
  agentes.push(novoAgente);
  return novoAgente;
}

function atualizarAgente(id, novosDados) {
  const agente = obterAgentePorId(id);
  if (!agente) return null;

  Object.assign(agente, novosDados);
  return agente;
}

function deletarAgente(id) {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return false;

  agentes.splice(index, 1);
  return true;
}

module.exports = {
  listarAgentes,
  obterAgentePorId,
  criarAgente,
  atualizarAgente,
  deletarAgente,
};

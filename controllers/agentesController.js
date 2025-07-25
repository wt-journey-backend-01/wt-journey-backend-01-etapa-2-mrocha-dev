let agentes = [];
let idCounter = 1;

exports.listarAgentes = (req, res) => {
  res.json(agentes);
};

exports.obterAgentePorId = (req, res) => {
  const id = parseInt(req.params.id);
  const agente = agentes.find(a => a.id === id);
  if (!agente) {
    return res.status(404).json({ mensagem: 'Agente não encontrado' });
  }
  res.json(agente);
};

exports.criarAgente = (req, res) => {
  const { nome, matricula, cargo } = req.body;
  const novoAgente = { id: idCounter++, nome, matricula, cargo };
  agentes.push(novoAgente);
  res.status(201).json(novoAgente);
};

exports.atualizarAgente = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, matricula, cargo } = req.body;
  const agente = agentes.find(a => a.id === id);
  if (!agente) {
    return res.status(404).json({ mensagem: 'Agente não encontrado' });
  }
  agente.nome = nome ?? agente.nome;
  agente.matricula = matricula ?? agente.matricula;
  agente.cargo = cargo ?? agente.cargo;
  res.json(agente);
};

exports.deletarAgente = (req, res) => {
  const id = parseInt(req.params.id);
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Agente não encontrado' });
  }
  agentes.splice(index, 1);
  res.status(204).send();
};

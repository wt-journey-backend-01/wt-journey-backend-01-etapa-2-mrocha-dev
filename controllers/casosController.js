let casos = [];
let idCounter = 1;

exports.listarCasos = (req, res) => {
  res.json(casos);
};

exports.obterCasoPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const caso = casos.find(c => c.id === id);

  if (!caso) {
    return res.status(404).json({ mensagem: 'Caso não encontrado' });
  }

  res.json(caso);
};

exports.criarCaso = (req, res) => {
  const { titulo, descricao, status } = req.body;
  const novoCaso = { id: idCounter++, titulo, descricao, status };
  casos.push(novoCaso);
  res.status(201).json(novoCaso);
};

exports.atualizarCaso = (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descricao, status } = req.body;
  const caso = casos.find(c => c.id === id);

  if (!caso) {
    return res.status(404).json({ mensagem: 'Caso não encontrado' });
  }

  caso.titulo = titulo ?? caso.titulo;
  caso.descricao = descricao ?? caso.descricao;
  caso.status = status ?? caso.status;

  res.json(caso);
};

exports.deletarCaso = (req, res) => {
  const id = parseInt(req.params.id);
  const index = casos.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Caso não encontrado' });
  }

  casos.splice(index, 1);
  res.json({ mensagem: 'Caso removido com sucesso' });

};

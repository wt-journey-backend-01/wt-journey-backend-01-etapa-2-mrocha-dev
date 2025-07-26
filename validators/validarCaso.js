function validarCaso(dados) {
  const erros = [];

  if (!dados.titulo || typeof dados.titulo !== 'string') {
    erros.push('O campo "titulo" é obrigatório e deve ser uma string.');
  }

  if (!dados.descricao || typeof dados.descricao !== 'string') {
    erros.push('O campo "descricao" é obrigatório e deve ser uma string.');
  }

  if (!dados.status || typeof dados.status !== 'string') {
    erros.push('O campo "status" é obrigatório e deve ser uma string.');
  } else {
    const statusValido = ['em andamento', 'encerrado', 'arquivado'];
    if (!statusValido.includes(dados.status.toLowerCase())) {
      erros.push('O campo "status" deve ser: "em andamento", "encerrado" ou "arquivado".');
    }
  }

  if (!dados.data || !isDataValida(dados.data)) {
    erros.push('O campo "data" é obrigatório e deve estar no formato válido (AAAA-MM-DD).');
  }

  return erros;
}

function isDataValida(data) {
  return /^\d{4}-\d{2}-\d{2}$/.test(data) && !isNaN(Date.parse(data));
}

module.exports = {
  validarCaso
};

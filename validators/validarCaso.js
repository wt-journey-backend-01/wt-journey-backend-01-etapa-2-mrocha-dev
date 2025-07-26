function validarCaso(dados) {
  const erros = [];

  if (!dados.titulo || dados.titulo.trim() === '') {
    erros.push('Título é obrigatório.');
  }

  if (!dados.descricao || dados.descricao.trim() === '') {
    erros.push('Descrição é obrigatória.');
  }

  if (!dados.data || isNaN(Date.parse(dados.data))) {
    erros.push('Data deve ser uma data válida (formato ISO).');
  }

  return erros;
}

module.exports = validarCaso;

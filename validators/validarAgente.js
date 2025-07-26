function validarAgente(dados) {
  const erros = [];

  if (!dados.nome || dados.nome.trim() === '') {
    erros.push('Nome é obrigatório.');
  }

  if (!dados.cargo || dados.cargo.trim() === '') {
    erros.push('Cargo é obrigatório.');
  }

  const statusPermitidos = ['ativo', 'inativo'];
  if (!dados.status || !statusPermitidos.includes(dados.status.toLowerCase())) {
    erros.push('Status deve ser "ativo" ou "inativo".');
  }

  return erros;
}

module.exports = validarAgente;

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

// NOVA FUNÇÃO: para PATCH
function validarCamposParciais(dados) {
  const erros = [];
  const statusPermitidos = ['ativo', 'inativo'];

  Object.keys(dados).forEach((campo) => {
    const valor = dados[campo];

    switch (campo) {
      case 'nome':
        if (typeof valor !== 'string' || valor.trim() === '') {
          erros.push('Nome deve ser uma string não vazia.');
        }
        break;
      case 'cargo':
        if (typeof valor !== 'string' || valor.trim() === '') {
          erros.push('Cargo deve ser uma string não vazia.');
        }
        break;
      case 'status':
        if (typeof valor !== 'string' || !statusPermitidos.includes(valor.toLowerCase())) {
          erros.push('Status deve ser "ativo" ou "inativo".');
        }
        break;
      default:
        erros.push(`Campo inválido: ${campo}`);
    }
  });

  return erros;
}

module.exports = {
  validarAgente,
  validarCamposParciais
};

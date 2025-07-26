// utils/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error('Erro:', err);

  // Define status padrão como 500 (erro interno)
  const statusCode = err.statusCode || 500;

  // Define mensagem padrão se não houver
  const message = err.message || 'Erro interno do servidor.';

  // Retorna o erro em formato JSON
  res.status(statusCode).json({
    erro: true,
    mensagem: message,
    detalhes: err.details || null // útil para erros de validação
  });
}

module.exports = errorHandler;

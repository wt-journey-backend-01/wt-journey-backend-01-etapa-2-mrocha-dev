const { body } = require('express-validator');

const validarAgente = [
  body('nome')
    .notEmpty().withMessage('O campo "nome" é obrigatório'),

  body('dataDeIncorporacao')
    .notEmpty().withMessage('O campo "dataDeIncorporacao" é obrigatório')
    .isISO8601().withMessage('O campo "dataDeIncorporacao" deve estar no formato YYYY-MM-DD'),

  body('cargo')
    .notEmpty().withMessage('O campo "cargo" é obrigatório'),
];

module.exports = { validarAgente };

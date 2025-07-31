const { body } = require('express-validator');

const validarCaso = [
  body('descricao').notEmpty().withMessage('Descrição é obrigatória'),
  body('status').isIn(['aberto', 'em andamento', 'fechado']).withMessage('Status inválido'),
  body('agente_id').notEmpty().withMessage('Agente responsável é obrigatório'),
];

module.exports = { validarCaso };

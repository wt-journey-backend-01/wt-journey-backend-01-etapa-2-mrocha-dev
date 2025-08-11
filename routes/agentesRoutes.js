const express = require('express');
const router = express.Router();
const {
  listarAgentes,
  buscarAgentePorId,
  cadastrarAgente,
  atualizarAgente,
  atualizarParcialAgente,
  deletarAgente,
  listarCasosDoAgente,
} = require('../controllers/agentesController');
const { validarAgente } = require('../validations/agentesValidation');

router.get('/', listarAgentes);
router.get('/:id', buscarAgentePorId);
router.post('/', validarAgente, cadastrarAgente);
router.put('/:id', validarAgente, atualizarAgente);
router.patch('/:id', atualizarParcialAgente);
router.delete('/:id', deletarAgente);

// Novo endpoint para listar casos do agente
router.get('/:id/casos', listarCasosDoAgente);

module.exports = router;

const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

// Listar todos os agentes
router.get('/', agentesController.listarAgentes);

// Buscar agente por ID
router.get('/:id', agentesController.buscarAgentePorId);

// Criar um novo agente
router.post('/', agentesController.criarAgente);

// Atualizar agente totalmente
router.put('/:id', agentesController.atualizarAgente);

// Atualizar agente parcialmente
router.patch('/:id', agentesController.atualizarParcialAgente);

// Deletar agente
router.delete('/:id', agentesController.deletarAgente);

module.exports = router;

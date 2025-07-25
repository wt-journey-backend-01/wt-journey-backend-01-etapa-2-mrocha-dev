const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/', casosController.listarCasos);
router.get('/:id', casosController.obterCasoPorId);
router.post('/', casosController.criarCaso);
router.put('/:id', casosController.atualizarCaso);
router.delete('/:id', casosController.deletarCaso);

module.exports = router;

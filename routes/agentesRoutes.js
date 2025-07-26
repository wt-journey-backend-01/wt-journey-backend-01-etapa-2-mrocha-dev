// routes/agentesRoutes.js
// Rotas relacionadas aos agentes

const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Lista todos os agentes
 *     responses:
 *       200:
 *         description: Lista de agentes retornada com sucesso
 */
router.get('/', agentesController.listarAgentes);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Cria um novo agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cargo
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 */
router.post('/', agentesController.criarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza completamente um agente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cargo
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 */
router.put('/:id', agentesController.atualizarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um agente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agente atualizado parcialmente com sucesso
 */
router.patch('/:id', agentesController.atualizarParcialAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Remove um agente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Agente deletado com sucesso
 */
router.delete('/:id', agentesController.deletarAgente);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/casosController');
const validacao = require('../validations/casosValidation');

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Gerenciamento de casos policiais
 */

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Listar todos os casos
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Lista de casos
 */
router.get('/', controller.listarCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Buscar um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso não encontrado
 */
router.get('/:id', controller.buscarCasoPorId);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cadastrar um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [aberto, em andamento, fechado]
 *               dataCriacao:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Caso cadastrado com sucesso
 */
router.post('/', validacao.validarCaso, controller.cadastrarCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualizar um caso por completo
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *               dataCriacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caso atualizado
 */
router.put('/:id', validacao.validarCaso, controller.atualizarCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualizar parcialmente um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Caso atualizado parcialmente
 */
router.patch('/:id', controller.atualizarParcialCaso);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Deletar um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Caso deletado com sucesso
 */
router.delete('/:id', controller.deletarCaso);

/**
 * @swagger
 * /casos/{caso_id}/agente:
 *   get:
 *     summary: Buscar agente associado ao caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agente encontrado
 *       404:
 *         description: Agente não encontrado
 */
router.get('/:caso_id/agente', controller.buscarAgenteDoCaso);

module.exports = router;

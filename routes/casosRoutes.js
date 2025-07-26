// routes/casosRoutes.js
// Rotas relacionadas aos casos

const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Lista todos os casos
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 */
router.get('/', casosController.listarCasos);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - status
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 */
router.post('/', casosController.criarCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza completamente um caso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - status
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 */
router.put('/:id', casosController.atualizarCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um caso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
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
 *     responses:
 *       200:
 *         description: Caso atualizado parcialmente com sucesso
 */
router.patch('/:id', casosController.atualizarParcialmenteCaso);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Deleta um caso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Caso deletado com sucesso
 */
router.delete('/:id', casosController.deletarCaso);

module.exports = router;

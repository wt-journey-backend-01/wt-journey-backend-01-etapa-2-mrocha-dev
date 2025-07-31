const express = require('express');
const router = express.Router();

const {
  listarAgentes,
  buscarAgentePorId,
  cadastrarAgente,
  atualizarAgente,
  atualizarParcialAgente,
  deletarAgente
} = require('../controllers/agentesController');

const { validarAgente } = require('../validations/agentesValidation');

/**
 * @swagger
 * tags:
 *   name: Agentes
 *   description: Gerenciamento de agentes policiais
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Listar todos os agentes
 *     tags: [Agentes]
 *     responses:
 *       200:
 *         description: Lista de agentes
 */
router.get('/', listarAgentes);

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Buscar um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agente encontrado
 *       404:
 *         description: Agente não encontrado
 */
router.get('/:id', buscarAgentePorId);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Cadastrar um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               matricula:
 *                 type: string
 *               departamento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agente criado
 */
router.post('/', validarAgente, cadastrarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualizar um agente por completo
 *     tags: [Agentes]
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
 *               nome:
 *                 type: string
 *               matricula:
 *                 type: string
 *               departamento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agente atualizado
 *       404:
 *         description: Agente não encontrado
 */
router.put('/:id', validarAgente, atualizarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualizar parcialmente um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Agente atualizado parcialmente
 *       404:
 *         description: Agente não encontrado
 */
router.patch('/:id', validarAgente, atualizarParcialAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Deletar um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Agente removido
 *       404:
 *         description: Agente não encontrado
 */
router.delete('/:id', deletarAgente);

module.exports = router;

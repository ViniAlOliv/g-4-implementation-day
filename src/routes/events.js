const express = require('express');
const router = express.Router();

// Armazenamento em memória
let events = [];

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lista eventos cadastrados com filtros opcionais
 *     tags:
 *       - Eventos
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial do filtro
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final do filtro
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Tag do evento
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/', (req, res) => {
  let { startDate, endDate, tag } = req.query;
  let filtered = events;

  if (startDate) {
    filtered = filtered.filter(e => new Date(e.startDate) >= new Date(startDate));
  }
  if (endDate) {
    filtered = filtered.filter(e => new Date(e.endDate) <= new Date(endDate));
  }
  if (tag) {
    filtered = filtered.filter(e => e.tag.toLowerCase() === tag.toLowerCase());
  }
  res.json(filtered);
});

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Cadastra um novo evento
 *     tags:
 *       - Eventos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Evento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', (req, res) => {
  const { name, startDate, endDate, tag } = req.body;
  if (!name || !startDate || !endDate || !tag) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  const event = { id: events.length + 1, name, startDate, endDate, tag };
  events.push(event);
  res.status(201).json(event);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         tag:
 *           type: string
 *     EventInput:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - endDate
 *         - tag
 *       properties:
 *         name:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         tag:
 *           type: string
 */

module.exports = router;

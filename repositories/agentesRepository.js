const db = require('../db/db');

async function findAll() {
  return db('agentes').select('*');
}

async function findById(id) {
  return db('agentes').where({ id }).first();
}

async function create(data) {
  const [novoAgente] = await db('agentes').insert(data).returning('*');
  return novoAgente;
}

async function update(id, data) {
  const [updated] = await db('agentes').where({ id }).update(data).returning('*');
  return updated || null;
}

async function patch(id, data) {
  const [updated] = await db('agentes').where({ id }).update(data).returning('*');
  return updated || null;
}

async function remove(id) {
  const deleted = await db('agentes').where({ id }).del();
  return deleted > 0;
}

async function findCasosByAgenteId(agente_id) {
  return db('casos').where({ agente_id });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
  findCasosByAgenteId,
};

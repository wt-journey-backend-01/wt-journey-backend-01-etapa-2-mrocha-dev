const db = require('../db/db');

async function findAll() {
  return db('casos').select('*');
}

async function findById(id) {
  return db('casos').where({ id }).first();
}

async function create(data) {
  const [novoCaso] = await db('casos').insert(data).returning('*');
  return novoCaso;
}

async function update(id, data) {
  const [updated] = await db('casos').where({ id }).update(data).returning('*');
  return updated || null;
}

async function patch(id, data) {
  const [updated] = await db('casos').where({ id }).update(data).returning('*');
  return updated || null;
}

async function remove(id) {
  const deleted = await db('casos').where({ id }).del();
  return deleted > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
};

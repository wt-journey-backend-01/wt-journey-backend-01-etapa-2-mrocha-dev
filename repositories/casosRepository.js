let casos = [];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find(c => c.id === id);
}

function create(caso) {
  casos.push(caso);
}

function update(id, dados) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return null;
  casos[index] = { ...casos[index], ...dados };
  return casos[index];
}

function remove(id) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return false;
  casos.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, create, update, remove };

exports.seed = async function (knex) {
  // Apaga dados existentes
  await knex('casos').del();

  // Insere novos dados
  await knex('casos').insert([
    { id: 1, titulo: 'Investigação 1', descricao: 'Roubo a banco', status: 'Em andamento', agente_id: 1 },
    { id: 2, titulo: 'Investigação 2', descricao: 'Tráfico de drogas', status: 'Fechado', agente_id: 2 },
    { id: 3, titulo: 'Investigação 3', descricao: 'Hack de sistema', status: 'Em andamento', agente_id: 3 }
  ]);
};

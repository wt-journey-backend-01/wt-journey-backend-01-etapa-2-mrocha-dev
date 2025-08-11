exports.seed = async function (knex) {
  // Apaga dados existentes
  await knex('agentes').del();

  // Insere novos dados
  await knex('agentes').insert([
    { id: 1, nome: 'João Silva', matricula: 'AG001', departamento: 'Homicídios' },
    { id: 2, nome: 'Maria Souza', matricula: 'AG002', departamento: 'Antidrogas' },
    { id: 3, nome: 'Carlos Pereira', matricula: 'AG003', departamento: 'Crimes Cibernéticos' }
  ]);
};

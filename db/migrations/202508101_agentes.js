/**
 * Criação da tabela de agentes
 */
exports.up = function (knex) {
  return knex.schema.createTable('agentes', function (table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('matricula').notNullable().unique();
    table.string('departamento').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('agentes');
};

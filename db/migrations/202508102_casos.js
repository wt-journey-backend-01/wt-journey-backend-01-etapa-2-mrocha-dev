/**
 * Criação da tabela de casos
 */
exports.up = function (knex) {
  return knex.schema.createTable('casos', function (table) {
    table.increments('id').primary();
    table.string('titulo').notNullable();
    table.text('descricao').notNullable();
    table.string('status').notNullable();
    table
      .integer('agente_id')
      .unsigned()
      .references('id')
      .inTable('agentes')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('casos');
};

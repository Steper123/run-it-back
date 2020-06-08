
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Location', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('address');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Location');
};


/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Game', (table) => {
    table.increments('id').primary();
    table.integer('locationId');
    table.integer('playersNeeded');
    table.integer('playersIn');
    table.string('startDate');
    table.string('startTime');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Game');
};

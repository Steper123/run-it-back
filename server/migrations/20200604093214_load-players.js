
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Player', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('googleId');
    table.integer('primaryPos');
    table.integer('height');
    table.integer('weight');
    table.string('birthday');
    table.string('primLocation');
    table.boolean('loggedIn');
    table.boolean('isAdmin');
    table.integer('currGameID');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Player');
};

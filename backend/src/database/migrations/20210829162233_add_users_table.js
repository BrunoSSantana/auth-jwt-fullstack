exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('username', 500).unique().notNullable();
    table.string('password', 500).notNullable();
    table.string('email', 500).notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};

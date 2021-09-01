exports.up = function (knex) {
  return knex.schema.createTable('tokens', table => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('refresh_token', 500).unique().notNullable();
    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('users.id').onDelete()

    table.timestamp('expires_date');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tokens');
};

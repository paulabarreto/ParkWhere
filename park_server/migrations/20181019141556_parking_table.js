
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('parking', function(table) {
      table.increments('id');
      table.string('address');
      table.float('latitude');
      table.float('longitude');
      table.integer('price_cents');
      table.integer('owner_user_id').unsigned();
      table.foreign('owner_user_id').references("id").inTable("users");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('parking')
  ])
};

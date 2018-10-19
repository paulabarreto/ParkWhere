
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('reservations', function(table) {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references("id").inTable("users");
      table.integer('parking_id').unsigned();
      table.foreign('parking_id').references("id").inTable("parking");
      table.integer('total_cents');
      table.date('start_date');
      table.date('end_date');
      table.timestamps('created_at');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('reservations')
  ])
};

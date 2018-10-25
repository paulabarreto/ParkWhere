
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', function(table) {
      table.increments('id');
      table.string('comments');
      table.integer('parking_id').unsigned();
      table.foreign('parking_id').references("id").inTable("street_parking");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments')
  ])
};

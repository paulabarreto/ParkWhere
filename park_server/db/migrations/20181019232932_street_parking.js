
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('street_parking', function(table) {
      table.increments('id');
      table.float('lat_start');
      table.float('long_start');
      table.float('lat_end');
      table.float('long_end');
      table.string('hours');
      table.integer('rate');
      table.string('comments');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('street_parking')
  ])
};

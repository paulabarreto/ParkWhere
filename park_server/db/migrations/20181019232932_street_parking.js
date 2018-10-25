
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('street_parking', function(table) {
      table.increments('id');
      table.float('lat_start');
      table.float('lng_start');
      table.float('lat_end');
      table.float('lng_end');
      table.string('hours');
      table.integer('rate');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('street_parking')
  ])
};

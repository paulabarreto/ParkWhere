
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('street_parking', function(table) {
      table.increments('id');
      table.string("address");
      table.string('lat_start');
      table.string('lng_start');
      table.string('lat_end');
      table.string('lng_end');
      table.string('hours');
      table.integer('rate');
      table.integer('rating');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('street_parking')
  ])
};

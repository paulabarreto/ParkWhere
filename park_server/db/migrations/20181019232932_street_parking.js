
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('street_parking', function(table) {
      table.increments('id');
      table.float('latitude');
      table.float('longitude');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('street_parking')
  ])
};

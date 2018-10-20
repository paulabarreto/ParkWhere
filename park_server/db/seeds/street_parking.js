
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('street_parking').del()
    .then(function () {
      // Inserts seed entries
      return knex('street_parking').insert([
        {id: 1, latitude: 43.644949, longitude: -79.395059},
        {id: 2, latitude: 43.643158, longitude: -79.392478},
        {id: 3, latitude: 43.643685, longitude: -79.390457}
      ]);
    });
};

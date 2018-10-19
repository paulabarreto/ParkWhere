
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('parking').del()
    .then(function () {
      // Inserts seed entries
      return knex('parking').insert([
        {id: 1, address: '391 King St W', latitude: 43.645635, longitude: -79.393563, price_cents: 17500, owner_user_id: 1},
        {id: 2, address: '23 Camden St', latitude: 43.646977, longitude: -79.396873, price_cents: 25000, owner_user_id: 2},
        {id: 3, address: '624 Adelaide St W', latitude: 43.645635, longitude: -79.402642, price_cents: 18000, owner_user_id: 3},
        {id: 4, address: '740A King St W', latitude: 43.643779, longitude: -79.404667, price_cents: 25000, owner_user_id: 1},
        {id: 5, address: '107 Baldwin St', latitude: 43.655202, longitude: -79.396739, price_cents: 15000, owner_user_id: 2}
      ]);
    });
};

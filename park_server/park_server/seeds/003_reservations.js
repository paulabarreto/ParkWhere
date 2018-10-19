
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reservations').del()
    .then(function () {
      // Inserts seed entries
      return knex('reservations').insert([
        {id: 1, user_id: 1, parking_id: 2, total_cents: 25000, start_date: "2018-08-01", end_date: "2018-08-31"},
        {id: 2, user_id: 2, parking_id: 3, total_cents: 18000, start_date: "2018-07-01", end_date: "2018-07-31"},
        {id: 3, user_id: 3, parking_id: 4, total_cents: 25000, start_date: "2018-05-01", end_date: "2018-05-31"}
      ]);
    });
};

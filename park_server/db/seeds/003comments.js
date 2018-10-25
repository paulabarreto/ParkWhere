
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {comments: "Construction site - your car will get dirty!", parking_id: 1},
        {comments: "Don't recommend parking here!", parking_id: 1},
        {comments: "School zone - don't park during the day", parking_id: 2},
        {comments: "Good for parking on weekends", parking_id: 2},
        {comments: "Very busy", parking_id: 3},
        {comments: "Very difficult to find a spot", parking_id: 3}
      ]);
    });
};

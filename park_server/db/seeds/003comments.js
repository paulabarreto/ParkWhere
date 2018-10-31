
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {comments: "Construction site - your car will get dirty!", parking_id: 1},
        {comments: "Don't recommend parking here!", parking_id: 1},
        {comments: "I'll never park here again", parking_id: 1},
        {comments: "School zone - don't park during the day", parking_id: 2},
        {comments: "Good for parking on weekends", parking_id: 2},
        {comments: "I parked here overnight and it was fine", parking_id: 2},
        {comments: "Very busy", parking_id: 3},
        {comments: "You can park if your car is small", parking_id: 3},
        {comments: "Very difficult to find a spot", parking_id: 3},
        {comments: "Construction site - your car will get dirty!", parking_id: 4},
        {comments: "Don't recommend parking here!", parking_id: 4},
        {comments: "I'll never park here again", parking_id: 4},
        {comments: "School zone - don't park during the day", parking_id: 5},
        {comments: "Good for parking on weekends", parking_id: 5},
        {comments: "I parked here overnight and it was fine", parking_id: 5},
        {comments: "Very busy", parking_id: 6},
        {comments: "You can park if your car is small", parking_id: 6},
        {comments: "Very difficult to find a spot", parking_id: 6},
        {comments: "I didn't see the sign! My car got towed!", parking_id: 7},
        {comments: "Watch out for the hidden no parking sign!", parking_id: 7},
        {comments: "Can't park here!", parking_id: 7},
        {comments: "No parking for more than 1hour! I got a ticket", parking_id: 8},
        {comments: "Careful, you'll seriously get a ticket if you exceed the 1h limit", parking_id: 8},
        {comments: "What? The ticket is horribly expensive!", parking_id: 8},
        {comments: "Very busy", parking_id: 9},
        {comments: "You can park if your car is small", parking_id: 9},
        {comments: "Very difficult to find a spot", parking_id: 9},
        {comments: "Very busy", parking_id: 10},
        {comments: "You can park if your car is small", parking_id: 10},
        {comments: "Very difficult to find a spot", parking_id: 10},
        {comments: "I didn't see the sign! My car got towed!", parking_id: 11},
        {comments: "Watch out for the hidden no parking sign!", parking_id: 11},
        {comments: "Can't park here!", parking_id: 11},
        {comments: "No parking for more than 1hour! I got a ticket", parking_id: 12},
        {comments: "Careful, you'll seriously get a ticket if you exceed the 1h limit", parking_id: 12},
        {comments: "What? The ticket is horribly expensive!", parking_id: 12},
        {comments: "Construction site - your car will get dirty!", parking_id: 13},
        {comments: "Don't recommend parking here!", parking_id: 13},
        {comments: "I'll never park here again", parking_id: 13},
        {comments: "School zone - don't park during the day", parking_id: 14},
        {comments: "Good for parking on weekends", parking_id: 14},
        {comments: "I parked here overnight and it was fine", parking_id: 14}

      ]);
    });
};

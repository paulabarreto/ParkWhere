
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('street_parking').del()
    .then(function () {
      // Inserts seed entries
      return knex('street_parking').insert([
        {id: 1, lat_start: 43.64399411938505, lng_start: -79.39475806736039, lat_end: 43.643895130371966, lng_end: -79.39524086498307, hours: "Mon-Sat 8am-9pm / Sun 1pm-9pm", rate: 4, rating: 1},
        {id: 2, lat_start: 43.643205326305576, lng_start: -79.39949809259019, lat_end: 43.64362263661553, lng_end: -79.39966975396715, hours: "Mon-Sat 8am-9pm / Sun 1pm-9pm", rate: 4, rating: 3},
        {id: 3, lat_start: 43.646041610793134, lng_start: -79.39800959910235, lat_end: 43.64572718525768, lng_end: -79.39788621748767, hours: "Mon-Sun 6pm-8am", rate: 0, rating: 4}
      ]);
    });
};

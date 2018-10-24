
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('street_parking').del()
    .then(function () {
      // Inserts seed entries
      return knex('street_parking').insert([
        {lat_start: 43.64399411938505, long_start: -79.39475806736039, lat_end: 43.643895130371966, long_end: -79.39524086498307, hours: "Mon-Sat 8am-9pm / Sun 1pm-9pm", rate: 4, comments: "Construction Site - your car will get dirty!"},
        {lat_start: 43.643205326305576, long_start: -79.39949809259019, lat_end: 43.64362263661553, long_end: -79.39966975396715, hours: "Mon-Sat 8am-9pm / Sun 1pm-9pm", rate: 4, comments: "Good place to park your car!"},
        {lat_start: 43.646041610793134, long_start: -79.39800959910235, lat_end: 43.64572718525768, long_end: -79.39788621748767, hours: "Mon-Sun 6pm-8am", rate: 0, comments: "Student pick up area - can't park during the day!"}
      ]);
    });
};

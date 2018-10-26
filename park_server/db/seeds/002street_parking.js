
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('street_parking').del()
    .then(function () {
      // Inserts seed entries
      return knex('street_parking').insert([
        {id: 1, lat_start: "43.64399411938505", lng_start: "-79.39475806736039", lat_end: "43.643895130371966", lng_end: "-79.39524086498307", hours: "Mon-Sat 8am-9pm / Sun 1pm-9pm", rate: 2, rating: 1},
        {id: 2, lat_start: "43.643205326305576", lng_start: "-79.39949809259019", lat_end: "43.64362263661553", lng_end: "-79.39966975396715", hours: "Mon-Sat 8am-9pm / Sun 1pm-9pm", rate: 4, rating: 3},
        {id: 3, lat_start: "43.646041610793134", lng_start: "-79.39800959910235", lat_end: "43.64572718525768", lng_end: "-79.39788621748767", hours: "Mon-Sun 6pm-8am", rate: 2, rating: 4},
        {id: 4, lat_start: "43.646023", lng_start: "-79.382794", lat_end: "43.645885", lng_end: "-79.382740", hours: "Fri-Sun 6pm-8am", rate: 2, rating: 3},
        {id: 5, lat_start: "43.669200", lng_start: "-79.397831", lat_end: "43.668932", lng_end: "-79.397705", hours: "Fri-Sun 6pm-8am", rate: 5, rating: 4},
        {id: 6, lat_start: "43.651992", lng_start: "-79.479624", lat_end: "43.651503", lng_end: "-79.479423", hours: "Fri-Sun 6pm-8am", rate: 5, rating: 5},
        {id: 7, lat_start: "43.639265", lng_start: "-79.443618", lat_end: "43.639320", lng_end: "-79.443238", hours: "Fri-Sun 6pm-8am", rate: 2, rating: 5},
        {id: 8, lat_start: "43.678238", lng_start: "-79.439784", lat_end: "43.678105", lng_end: "-79.440362", hours: "Fri-Sun 6pm-8am", rate: 3, rating: 5},
        {id: 9, lat_start: "43.679893", lng_start: "-79.390590", lat_end: "43.680025", lng_end: "-79.389947", hours: "Fri-Sun 6pm-8am", rate: 3, rating: 3},
        {id: 10, lat_start: "43.663393", lng_start: "-79.400780", lat_end: "43.663291", lng_end: "-79.401205", hours: "Fri-Sun 6pm-8am", rate: 4, rating: 3}
      ]);
    });
};

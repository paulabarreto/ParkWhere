
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('street_parking').del()
    .then(function () {
      // Inserts seed entries
      return knex('street_parking').insert([
        {id: 1, lat_start: 43.645122, long_start: -79.396500, lat_end: 43.645339, long_end: -79.395416, hours: "Mon-Sun 6pm-6am", rate: 2},
        {id: 2, lat_start: 43.643709, long_start: -79.395867, lat_end: 43.643895, long_end: -79.394955, hours: "Sat-Sun 6am-11pm", rate: 5},
        {id: 3, lat_start: 43.642071, long_start: -79.396790, lat_end: 43.642661, long_end: -79.394526, hours: null, rate: null, rate: 0}
      ]);
    });
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('street_parking').del()
    .then(function () {
      // Inserts seed entries
      return knex('street_parking').insert([
        {address: , lat_start: "43.645092", lng_start: "-79.403118", lat_end: "43.644021", lng_end: "-79.402641", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 2, rating: 1},
        {address: , lat_start: "43.646358", lng_start: "-79.403612", lat_end: "43.645337", lng_end: "-79.403199", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 4, rating: 3},
        {address: , lat_start: "43.647119", lng_start: "-79.403896", lat_end: "43.646568", lng_end: "-79.403692", hours: '[{"date":"Mon-Fri","startT":"6:00 pm","endT":"8:00 am"},{"date":"Saturday","startT":"6:00 pm","endT":"8:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 2, rating: 4},
        {address: , lat_start: "43.647188", lng_start: "-79.403751", lat_end: "43.647606", lng_end: "-79.401636", hours:'[{"date":"Mon-Fri","startT":"9:00 am","endT":"7:00 pm"},{"date":"Saturday","startT":"9:00 am","endT":"7:00 pm"}]', rate: 2, rating: 3},
        {address: , lat_start: "43.647701", lng_start: "-79.401240", lat_end: "43.647998", lng_end: "-79.399755", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"7:00 pm"},{"date":"Saturday","startT":"9:00 am","endT":"7:00 pm"}]', rate: 5, rating: 4},
        {address: , lat_start: "43.648062", lng_start: "-79.399495", lat_end: "43.651503", lng_end: "-79.479423", hours: '[{"date":"Mon-Fri","startT":"12:00 pm","endT":"5:00 pm"},{"date":"Sunday","startT":"9:00 am","endT":"7:00 pm"}]', rate: 5, rating: 5},
        {address: , lat_start: "43.639265", lng_start: "-79.443618", lat_end: "43.639320", lng_end: "-79.443238", hours: '[{"date":"Mon-Fri","startT":"8:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"9:00 am","endT":"7:00 pm"}]', rate: 2, rating: 5},
        {address: , lat_start: "43.678238", lng_start: "-79.439784", lat_end: "43.678105", lng_end: "-79.440362", hours: '[{"date":"Mon-Fri","startT":"8:00 pm","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 am","endT":"7:00 pm"}]', rate: 3, rating: 5},
        {address: , lat_start: "43.679893", lng_start: "-79.390590", lat_end: "43.680025", lng_end: "-79.389947", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"7:00 pm"},{"date":"Saturday","startT":"9:00 am","endT":"7:00 pm"},{"date":"Sunday","startT":"9:00 am","endT":"7:00 pm"}]', rate: 3, rating: 3},
        {address: , lat_start: "43.663105", lng_start: "-79.401740", lat_end: "43.663439", lng_end: "-79.400167", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"7:00 pm"},{"date":"Saturday","startT":"9:00 am","endT":"7:00 pm"},{"date":"Sunday","startT":"9:00 am","endT":"7:00 pm"}]', rate: 4, rating: 3}
      ]);
    });
};

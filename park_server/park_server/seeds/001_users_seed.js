
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Paula', email: 'paulavilaca@gmail.com', password: '123'},
        {id: 2, name: 'Donny', email: 'donny1103@hotmail.com', password: '234'},
        {id: 3, name: 'Random', email: 'random@mail.com', password: '567'}
      ]);
    });
};

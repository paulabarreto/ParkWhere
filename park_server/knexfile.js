require('dotenv').config();

// Update with your config settings.

module.exports = {

  development: {
  client: 'postgresql',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT,
    ssl      : process.env.DB_SSL
  },
  migrations: {
    directory: './migrations',
    tableName: 'migrations'
  },
  seeds: {
    directory: './park_server/seeds'
  }
},

  staging: {
    client: 'postgresql',
    connection: {
      database: 'final_project',
      user:     'labber',
      password: 'labber'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'final_project',
      user:     'labber',
      password: 'labber'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

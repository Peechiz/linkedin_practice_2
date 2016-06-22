module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'oauth'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};

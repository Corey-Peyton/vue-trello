const config = {
  development: {
    connection: {
      dialect: "sqlite",
      storage: "./db.development.sqlite",
    },
  },
  test: {
    connection: {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    },
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: process.env.DATABASE_DIALECT,
    },
    logging: false,
  },
};

module.exports = config;

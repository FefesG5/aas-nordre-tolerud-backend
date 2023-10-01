require("dotenv").config();

const developmentConfig = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
};

const productionConfig = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
};

const currentConfig =
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig;

module.exports = currentConfig;

import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const knexConfig: { [key: string]: Knex.Config } = {
  production: {
    client: "mysql2",
    connection: process.env.PROD_DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    useNullAsDefault: true,
  },
  development: {
    client: "mysql",
    /* To run locally for migration purpose I've found this:
    - To do not use .dotenv variables
    - The host here will be 'localhost' not 'db'as in container, because db network was exposed to localhost
    sample connection string: "mysql://root:aime123@localhost:3306/demo_credit"
     */
    connection: process.env.DEV_DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    useNullAsDefault: true,
  },
};
export default knexConfig;

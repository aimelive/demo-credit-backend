import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: process.env.DB_MYSQL_URL,
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

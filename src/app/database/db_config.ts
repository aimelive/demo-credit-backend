import knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
import dotenv from "dotenv";

dotenv.config();

const db_connect = knexConfig[process.env.NODE_ENV || "development"];

const knex_connect = knex(db_connect);

Model.knex(knex_connect);

export default knex_connect;

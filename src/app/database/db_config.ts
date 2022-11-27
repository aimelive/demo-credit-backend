import knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";

const db_connect = knexConfig["development"];

const knex_connect = knex(db_connect);

Model.knex(knex_connect);

export default knex_connect;

import knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
import dotenv from "dotenv";

dotenv.config();

/* You might need to remove 
=== process.env.NODE_ENV || === 
below to make tests work on development 
environment  */

const db_connect =
  knexConfig[
    process.env.NODE_ENV || //Comment this line to run all tests successfully
      "development"
  ];

const knex_connect = knex(db_connect);

Model.knex(knex_connect);

export default knex_connect;

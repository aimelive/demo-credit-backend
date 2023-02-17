import knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

export const con = mysql.createConnection(
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_URL!
    : process.env.DEV_DB_URL!
);
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

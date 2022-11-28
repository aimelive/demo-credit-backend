import { Knex } from "knex";
import { uuid } from "uuidv4";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("accounts", function (table) {
    table.string("account_id", 255).defaultTo(uuid()).notNullable().primary();
    table.string("account_name", 255).notNullable();
    table.string("user_id", 255).notNullable().unique();
    table.bigInteger("balance").notNullable().defaultTo(0);
    table.string("currency", 3).notNullable().defaultTo("USD");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("accounts");
}

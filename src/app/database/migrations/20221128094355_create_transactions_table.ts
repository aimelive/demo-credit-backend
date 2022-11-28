import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", function (table) {
    table.increments("id").primary();
    table
      .string("action")
      .checkIn(["deposit", "withdraw", "transfer"])
      .notNullable();
    table.bigInteger("amount").notNullable().checkPositive();
    table.string("currency", 3).notNullable().defaultTo("USD");
    table.string("from", 255).notNullable();
    table.string("to", 255).notNullable();
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("transactions");
}

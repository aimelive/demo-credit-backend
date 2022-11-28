import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("accounts").del();

  // Inserts seed entries
  await knex("accounts").insert([
    {
      account_id: "da28c4ac-590e-47aa-b368-8993bc1be8a1",
      account_name: "Aime Ndayambaje",
      user_id: 1,
    },
  ]);
}

import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      fullname: "Aime Ndayambaje",
      username: "aimelive",
      email: "aimendayambaje24@gmail.com",
      password: "$2b$10$rpkakxz5/f3QXZMfEy8JeuC1nSLRGKzIMQ7u4JG9cuDficVaFSOb.",
      role: "admin",
      account_id: "da28c4ac-590e-47aa-b368-8993bc1be8a1",
    },
  ]);
}

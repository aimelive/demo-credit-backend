import knex_connect from "../database/db_config";
const db = knex_connect;

export default class UserServices {
  static async getUser(email: string) {
    return await db("users").where({ email }).first();
  }
}

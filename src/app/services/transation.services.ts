import knex_connect from "../database/db_config";

const db = knex_connect;

export default class TransactionService {
  static addTransaction = async (transaction: any) => {
    try {
      await db("transactions").insert(transaction);
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };
}

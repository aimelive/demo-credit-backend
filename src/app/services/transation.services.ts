import knex_connect from "../database/db_config";
import { Transaction } from "../restful/models/_transaction_model";

const db = knex_connect;

export default class TransactionService {
  static addTransaction = async (transaction: Transaction) => {
    try {
      await db("transactions").insert(transaction);
      return true;
    } catch (error: any) {
      return false;
    }
  };
}

import { Request, Response } from "express";
import knex_connect from "../../database/db_config";
import ErrorException, { Respond } from "../../helpers/response";

const db = knex_connect;

export default class TransationController {
  //Getting transactions
  static async getTransactions(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;

      //Selecting transactions made me
      const transactions = await db("transactions")
        .where({ from: userId })
        .select("*");

      //Selecting transactions made by others on my account
      const received = await db("transactions")
        .where({ to: userId })
        .select("*");

      received.map((t) => {
        if (t.from !== t.to) transactions.push(t);
      });

      if (transactions.length == 0) {
        return new Respond(false, "Transactions empty", res);
      }
      return new Respond(
        true,
        "Transactions retrieved successfully",
        res,
        200,
        { count: transactions.length, transactions }
      );
    } catch (error: any) {
      return new ErrorException(
        "Retrieving transactions failed",
        error.message,
        res
      );
    }
  }

  static async getOneTransaction(req: Request, res: Response) {
    try {
      const transaction = await db("transactions")
        .where({ id: req.params.id })
        .first();
      if (transaction) {
        return new Respond(
          true,
          "Transaction retrieved successfully",
          res,
          200,
          transaction
        );
      }
      return new Respond(false, "transaction not found", res, 404);
    } catch (error: any) {
      return new ErrorException(
        "Retrieve transacton failed",
        error.message,
        res
      );
    }
  }
}

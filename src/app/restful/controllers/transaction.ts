import { Request, Response } from "express";
import knex_connect from "../../database/db_config";

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
        return res.status(200).json({
          success: false,
          message: "Transactions empty",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Transactions retrieved successfully",
        count: transactions.length,
        transactions,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "An error occurred, please try again later.",
        error,
      });
    }
  }

  static async getOneTransaction(req: Request, res: Response) {
    try {
      const transaction = await db("transactions")
        .where({ id: req.params.id })
        .first();
      if (transaction) {
        return res.status(200).json({
          success: true,
          message: "Transaction retrieved successfully",
          transaction,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Transaction does not exist",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "An error occurred, please try again later.",
        error,
      });
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { isUuid } from "uuidv4";
import knex_connect from "../../database/db_config";

const db = knex_connect;

export default class AccountMiddleware {
  static async checkExist(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.userId;
      const account = await db("accounts")
        .where({ user_id: userId })
        .select("*")
        .first();
      if (!account) {
        return res.status(404).json({
          status: false,
          message: "account does not exist",
        });
      }
      res.locals.account = account;
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "An error occurred, please try again later.",
        error,
      });
    }
  }

  static async checkToExist(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = req.params.to_account;
      if (!isUuid(accountId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid transfer account id",
        });
      }
      
      if (res.locals.account.account_id === accountId) {
        return res.status(400).json({
          success: false,
          message: "Transaction failed",
        });
      }
      const account = await db("accounts")
        .where({ account_id: accountId })
        .select("*")
        .first();
      if (!account) {
        return res.status(404).json({
          status: false,
          message: "transfer account does not exist",
        });
      }
      res.locals.to_account = account;
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "An error occurred, please try again later.",
        error: "We could not check account you're transfer money to",
      });
    }
  }

  static async checkBalance(req: Request, res: Response, next: NextFunction) {
    const account = res.locals.account;
    if (account.balance < req.body.amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient fund",
        balance: `${account.balance} ${account.currency}`,
      });
    }
    next();
  }
}

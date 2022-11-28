import { Request, Response, NextFunction } from "express";
import { isUuid } from "uuidv4";
import knex_connect from "../../database/db_config";
import ErrorException, { Respond } from "../../helpers/response";

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
        return new Respond(false, "account does not exist", res, 404);
      }
      res.locals.account = account;
      next();
    } catch (error: any) {
      return new ErrorException("Checking account failed", error.message, res);
    }
  }

  static async checkToExist(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = req.params.to_account;
      if (!isUuid(accountId)) {
        return new Respond(false, "Invalid transfer account id", res, 400);
      }

      if (res.locals.account.account_id === accountId) {
        return new Respond(
          false,
          "same account can't make transaction",
          res,
          400
        );
      }
      const account = await db("accounts")
        .where({ account_id: accountId })
        .select("*")
        .first();
      if (!account) {
        return new Respond(false, "transfer account does not exist", res, 404);
      }
      res.locals.to_account = account;
      next();
    } catch (error: any) {
      return new ErrorException(
        "Checking to_account failed",
        error.message,
        res
      );
    }
  }

  static async checkBalance(req: Request, res: Response, next: NextFunction) {
    const account = res.locals.account;
    if (account.balance < req.body.amount) {
      return new Respond(false, "insufficient fund", res, 400, {
        balance: `${account.balance} ${account.currency}`,
      });
    }
    next();
  }
}

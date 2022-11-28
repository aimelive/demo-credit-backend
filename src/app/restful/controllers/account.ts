import knex_connect from "../../database/db_config";
import { Request, Response } from "express";
import TransactionService from "../../services/transation.services";
import ErrorException, { Respond } from "../../helpers/response";

const db = knex_connect;

export default class AccountController {
  //Viewing account details
  static async viewDetails(req: Request, res: Response) {
    const account = res.locals.account;
    return new Respond(
      true,
      "Account retrieved successfully",
      res,
      200,
      account
    );
  }
  //Adding money to account
  static async deposit(req: Request, res: Response) {
    try {
      const account = res.locals.account;
      const new_balance = account.balance + req.body.amount;

      //Updating balance to user account
      await db("accounts")
        .update({ balance: new_balance })
        .where({ user_id: account.user_id, account_id: account.account_id });

      account.balance = new_balance;

      //Adding into transactions table
      await TransactionService.addTransaction({
        action: "deposit",
        amount: req.body.amount,
        from: account.user_id,
        to: account.user_id,
      });
      return new Respond(
        true,
        `${req.body.amount} ${account.currency} deposited to your account successfully`,
        res,
        201,
        account
      );
    } catch (error: any) {
      return new ErrorException("Deposit failed", error.message, res);
    }
  }

  //Withdraw money from bank account
  static async withdraw(req: Request, res: Response) {
    try {
      const account = res.locals.account;
      const new_balance = account.balance - req.body.amount;

      //Updating balance
      await db("accounts")
        .update({ balance: new_balance })
        .where({ user_id: account.user_id, account_id: account.account_id });

      account.balance = new_balance;

      //Adding into transactions table
      await TransactionService.addTransaction({
        action: "withdraw",
        amount: req.body.amount,
        from: account.user_id,
        to: account.user_id,
      });

      //Responding user
      return new Respond(
        true,
        `${req.body.amount} ${account.currency} withdrawn from your account successfully`,
        res,
        200,
        account
      );
    } catch (error: any) {
      return new ErrorException("Withdraw failed", error.message, res);
    }
  }

  static async transfer(req: Request, res: Response) {
    try {
      const from_account = res.locals.account;
      const to_account = res.locals.to_account;
      const amount = req.body.amount;

      const new_balance_from_account = from_account.balance - amount;
      const new_balance_to_account = to_account.balance + amount;

      //Updating balance: from_account
      await db("accounts")
        .update({ balance: new_balance_from_account })
        .where({ account_id: from_account.account_id });

      //Updating balance: to_account
      await db("accounts")
        .update({ balance: new_balance_to_account })
        .where({ account_id: to_account.account_id });

      from_account.balance = new_balance_from_account;

      //Adding into transactions table
      await TransactionService.addTransaction({
        action: "transfer",
        amount: req.body.amount,
        from: from_account.user_id,
        to: to_account.user_id,
      });

      //Responding to user
      return new Respond(
        true,
        `${amount} ${from_account.currency} transfered to ${to_account.account_name} account successfully`,
        res,
        200,
        from_account
      );
    } catch (error: any) {
      return new ErrorException(`Transfer failed`, error.message, res);
    }
  }
}

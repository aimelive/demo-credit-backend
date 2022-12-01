import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { uuid } from "uuidv4";
import knex_connect from "../../database/db_config";
import { comparePwd, hashPwd } from "../../helpers/hash_pwd";
import ErrorException, { Respond } from "../../helpers/response";
import { generateToken } from "../../helpers/token";

const db = knex_connect;

export default class UserController {
  //Getting all users
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await db("users").select("*");
      return new Respond(true, "Users retrieved successfully!", res, 200, {
        count: users.length,
        users,
      });
    } catch (error: any) {
      return new ErrorException("Retrieving users failed", error.message, res);
    }
  }
  //creating uer
  static async createUser(req: Request, res: Response) {
    try {
      //Generating random unique id for the user account
      const accountId = randomUUID() || uuid();

      //Encrypting user password
      const pwd = await hashPwd(req.body.password);
      const user = {
        account_id: accountId,
        password: pwd,
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      };
      //Creating user
      const userId = await db("users").insert(user);

      //Creating user wallet
      await db("accounts").insert({
        account_id: accountId,
        account_name: req.body.fullname,
        user_id: userId,
      });

      //Getting user data
      const userData = await db("users").where({ id: userId }).first();

      const token = generateToken(`${userId}`); //Generate user id token expires in 4h

      //Returning the response to the user
      if (userData) {
        return new Respond(true, "user created successfully", res, 201, {
          user: userData,
          token,
        });
      }

      throw new Error("Something went wrong");
    } catch (error: any) {
      return new ErrorException("Create user failed", error.message, res);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const user = await db("users").where({ email: req.body.email }).first();
      if (!user) {
        return new Respond(false, "User does not exist", res, 404);
      }
      if (!(await comparePwd(req.body.password, user.password))) {
        return new Respond(false, "Incorrect password", res, 400);
      }
      const token = generateToken(user.id);
      return new Respond(true, "User logged in successfully", res, 200, {
        user,
        token,
      });
    } catch (error: any) {
      return new ErrorException("Login failed", error.message, res);
    }
  }
}

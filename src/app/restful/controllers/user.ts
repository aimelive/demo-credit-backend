import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { uuid } from "uuidv4";
import knex_connect from "../../database/db_config";
import { comparePwd, hashPwd } from "../../helpers/hash_pwd";
import { generateToken } from "../../helpers/token";

const db = knex_connect;

export default class UserController {
  //Getting all users
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await db("users").select("*");
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully!",
        users: users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "An error occurred, please try again later.",
        error: error,
      });
    }
  }
  //creating uer
  static async createUser(req: Request, res: Response) {
    try {
      //Generating random unique id for the user account
      const accountId = randomUUID() || uuid();

      //Encrypting user password
      const pwd = await hashPwd(req.body.password);

      //Creating user
      const userId = await db("users").insert({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        account_id: accountId,
        password: pwd,
        created_at: new Date(),
        updated_at: new Date(),
      });

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
        return res.status(201).json({
          status: true,
          message: "user created successfully",
          user: userData,
          token,
        });
      }

      throw new Error("Something went wrong");
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "An error occurred, please try again later.",
        error: error,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const user = await db("users").where({ email: req.body.email }).first();
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "User does not exist",
        });
      }
      if (!(await comparePwd(req.body.password, user.password))) {
        return res.status(400).json({
          status: false,
          message: "Incorrect password",
        });
      }
      const token = generateToken(user.id);
      return res.status(200).json({
        status: true,
        message: "User logged in successfully",
        user,
        token,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "An error occurred, please try again later.",
        error,
      });
    }
  }
}

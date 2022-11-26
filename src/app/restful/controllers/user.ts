import { Request, Response } from "express";

export default class UserController {
  //creating uer
  static async getUsers(req: Request, res: Response) {
    res.json({
      message: "Users retrieved successfully!",
    });
  }
  //creating uer
  static async createUser(req: Request, res: Response) {
    res.json({
      message: "User created successfully!",
    });
  }
}


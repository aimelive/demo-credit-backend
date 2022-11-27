import { Request, Response, NextFunction } from "express";
import UserServices from "../../services/user.services";

export default class AuthMiddleWare {
  static async checkExist(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const exist = await UserServices.getUser(email);
    if (exist) {
      return res.status(403).json({
        status: false,
        message: "email " + email + " already exists",
      });
    }
    next();
  }

  static async loggedInUser(req: Request, res: Response, next: NextFunction) {}
}

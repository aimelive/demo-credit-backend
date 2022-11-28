import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../../helpers/token";
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

  static async loggedInUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        return res.status(400).json({
          status: false,
          message: "User not logged in",
        });
      }
      const { userId } = decodeToken(req.headers.authorization.split(" ")[1]);
      if (!userId) {
        throw new Error("Invalid auth token");
      }
      res.locals.userId = userId;
      next();
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Invalid auth token",
      });
    }
  }
}

import { Request, Response, NextFunction } from "express";
import ErrorException, { Respond } from "../../helpers/response";
import { decodeToken } from "../../helpers/token";
import UserServices from "../../services/user.services";

export default class AuthMiddleWare {
  static async checkExist(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const exist = await UserServices.getUser(email);
    if (exist) {
      return new Respond(false, "email " + email + " already exists", res, 409);
    }
    next();
  }

  static async loggedInUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        return new Respond(false, "User not logged in", res, 400);
      }
      const { userId } = decodeToken(req.headers.authorization.split(" ")[1]);
      if (!userId) {
        throw new Error("Invalid auth token");
      }
      res.locals.userId = userId;
      next();
    } catch (error: any) {
      return new ErrorException("Invalid auth token", error.message, res);
    }
  }
}

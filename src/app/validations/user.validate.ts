import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default class UserValidate {
  static register(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      fullname: Joi.string().required().min(5).max(20),
      username: Joi.string().required().min(5).max(20),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6).max(12),
      role: Joi.string().required().valid("admin", "lender", "borrower"),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }
    next();
  }

  static login(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6).max(12),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }
    next();
  }
}

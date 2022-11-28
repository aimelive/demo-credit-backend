import { NextFunction, Request, Response } from "express";
import Joi from "joi";
export default class AccountValidator {
  static amount(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      amount: Joi.number().required().greater(0),
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

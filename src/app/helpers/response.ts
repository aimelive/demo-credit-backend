import { Response } from "express";

export default class ErrorException {
  message: string;
  error: string;
  res: Response;
  constructor(message: string, error: string, res: Response) {
    this.message = message;
    this.error = error;
    this.res = res;
    this.respond();
  }
  respond(): Response {
    return this.res.status(400).json({
      success: false,
      message: this.message,
      error: this.error,
    });
  }
}

export class Respond {
  success: boolean;
  message: string;
  code: number;
  param?: object;
  res: Response;
  constructor(
    success: boolean,
    message: string,
    res: Response,
    code?: number,
    param?: object
  ) {
    this.code = code || 200;
    this.message = message;
    this.success = success;
    this.param = param;
    this.res = res;
    this.respond();
  }
  respond(): Response {
    return this.res.status(this.code).json({
      success: this.success,
      message: this.message,
      data: this.param,
    });
  }
}

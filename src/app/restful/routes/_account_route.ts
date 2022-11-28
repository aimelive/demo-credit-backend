import express from "express";
import AccountValidator from "../../validations/account.validate";
import AccountController from "../controllers/account";
import AccountMiddleware from "../middleware/account.middleware";
import AuthMiddleWare from "../middleware/auth.middleware";

const accountRoutes = express.Router();

accountRoutes.get(
  "/details",
  AuthMiddleWare.loggedInUser,
  AccountMiddleware.checkExist,
  AccountController.viewDetails
);
accountRoutes.post(
  "/deposit",
  AccountValidator.amount,
  AuthMiddleWare.loggedInUser,
  AccountMiddleware.checkExist,
  AccountController.deposit
);

accountRoutes.post(
  "/withdraw",
  AccountValidator.amount,
  AuthMiddleWare.loggedInUser,
  AccountMiddleware.checkExist,
  AccountMiddleware.checkBalance,
  AccountController.withdraw
);

accountRoutes.post(
  "/transfer/:to_account",
  AccountValidator.amount,
  AuthMiddleWare.loggedInUser,
  AccountMiddleware.checkExist,
  AccountMiddleware.checkBalance,
  AccountMiddleware.checkToExist,
  AccountController.transfer
);

export default accountRoutes;

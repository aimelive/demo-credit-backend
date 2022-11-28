import express from "express";
import TransationController from "../controllers/transaction";
import AuthMiddleWare from "../middleware/auth.middleware";

const transactionRoutes = express.Router();

transactionRoutes.get(
  "/",
  AuthMiddleWare.loggedInUser,
  TransationController.getTransactions
);

transactionRoutes.get(
  "/:id",
  AuthMiddleWare.loggedInUser,
  TransationController.getOneTransaction
);

export default transactionRoutes;

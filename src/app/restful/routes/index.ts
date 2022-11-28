import express from "express";
import accountRoutes from "./_account_route";
import transactionRoutes from "./_transaction_route";
import userRoutes from "./_user_route";

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/account", accountRoutes);
routes.use("/transactions", transactionRoutes);

export default routes;

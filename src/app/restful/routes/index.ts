import express from "express";
import accountRoutes from "./_account_route";
import transactionRoutes from "./_transaction_route";
import userRoutes from "./_user_route";
import swaggerUi from "swagger-ui-express";
import config from "../../docs";

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/account", accountRoutes);
routes.use("/transactions", transactionRoutes);
routes.use("/docs", swaggerUi.serve, swaggerUi.setup(config));

export default routes;

import express from "express";
import userRoutes from "./_user_route";

const routes = express.Router();
routes.use("/users", userRoutes);
export default routes;

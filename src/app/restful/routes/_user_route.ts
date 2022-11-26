import express from "express";
import UserController from "../controllers/user";

const userRoutes = express.Router();

userRoutes.get("/", UserController.getUsers);
userRoutes.post("/register", UserController.createUser);

export default userRoutes;

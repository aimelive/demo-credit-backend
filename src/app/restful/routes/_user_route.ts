import express from "express";
import UserValidate from "../../validations/user.validate";
import UserController from "../controllers/user";
import AuthMiddleWare from "../middleware/auth.middleware";

const userRoutes = express.Router();

userRoutes.get("/", AuthMiddleWare.loggedInUser, UserController.getUsers);
userRoutes.post(
  "/register",
  UserValidate.register,
  AuthMiddleWare.checkExist,
  UserController.createUser
);

userRoutes.post("/login", UserValidate.login, UserController.login);

export default userRoutes;

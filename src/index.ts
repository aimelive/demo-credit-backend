import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import routes from "./app/restful/routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT_NUMBER || 3000;

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    message: "Welcome to Demo Credit API!",
  });
});

app.use("/api/v1", routes);

app.get("/api/*", (req: Request, res: Response) => {
  const statusCode: number = 404;
  res.status(statusCode).json({
    message: statusCode + " - path not found",
  });
});

app.listen(PORT, (): void => {
  console.log("Server running on port " + PORT + " 🔥");
});

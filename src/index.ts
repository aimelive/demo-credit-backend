import express, { Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import routes from "./app/restful/routes";
import bodyParser from "body-parser";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT_NUMBER || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

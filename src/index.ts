import express, { Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import routes from "./app/restful/routes";
import bodyParser from "body-parser";
import { Respond } from "./app/helpers/response";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT_NUMBER || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): Respond => {
  return new Respond(true, "Welcome to Demo Credit API!", res);
});

app.use("/api/v1", routes);

app.get("/api/*", (req: Request, res: Response): Respond => {
  return new Respond(false, "path not found", res, 404);
});

app.listen(PORT, (): void => {
  console.log("Server running on port " + PORT + " 🔥");
});

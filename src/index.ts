import { Request, Response } from "express";
import routes from "./app/restful/routes";
import { Respond } from "./app/helpers/response";
import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { con } from "./app/database/db_config";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response): Respond => {
  return new Respond(true, "Welcome to Demo Credit API!", res);
});

app.use("/api/v1", routes);

app.get("/api/*", (req: Request, res: Response): Respond => {
  return new Respond(false, "path not found", res, 404);
});
app.listen(PORT, (): void => {
  console.log(
    "Server running on port " + PORT + " 🔥\nPath: http://localhost:" + PORT
  );
  con.connect((err) => {
    if (err) {
      console.log("Database not connected succesfully! Why? ", err);
      return;
    }
    console.log("Database connected succesfully! 😂");
  });
});

export default app;

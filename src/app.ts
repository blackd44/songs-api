import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());

app.use(router);
app.use((_req, res) => {
  res.status(404).json({ message: "Api not found" });
});
app.use(errorHandler);

export default app;

import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT;

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 🚀  [server]: Server is running at http://localhost:${PORT}`);
});

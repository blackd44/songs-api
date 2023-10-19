import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
// import { google } from "googleapis";

dotenv.config();
const PORT = process.env.PORT;
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const CLIENT_REDIRECT = process.env.CLIENT_REDIRECT;

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   CLIENT_REDIRECT
// );

const app: Express = express();

app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 🚀  [server]: Server is running at http://localhost:${PORT}`);
});

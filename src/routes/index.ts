import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", (req, res) => {
  res.json("Express + TypeScript Server + me");
});

router.get("/tube", async (req, res) => {
  const { q, limit } = req.query;

  const api = process.env.API_URL;
  const apikey = process.env.API_KEY;

  const url = `${api}/search?part=snippet&maxResults=${
    (limit as string) || 10
  }&q=${q}&type=video&key=${apikey}`;
  const { data } = await axios.get(url);

  res.json(data);
});

export default router;

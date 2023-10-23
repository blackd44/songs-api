import { Router } from "express";
import axios from "axios";
import download_router from "./download.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Welcome to our api" });
});

router.get("/search", async (req, res, next) => {
  const { q, limit, videoType, order } = req.query;

  const api = process.env.API_URL;
  const apikey = process.env.API_KEY;

  const url = `${api}/search?part=snippet&maxResults=${limit || 10}&q=${
    q || ""
  }&type=video&key=${apikey}&videoType=${videoType || "any"}&order=${
    order || "relevance"
  }`;
  const { data, error } = await axios
    .get(url)
    .then((res) => ({ ...res, error: null, data: res.data }))
    .catch((error) => ({ error, data: null }));

  if (error) {
    res.statusCode = 400;
    return next(new Error(error));
  }
  return res.json({ data });
});

router.use(download_router);

export default router;

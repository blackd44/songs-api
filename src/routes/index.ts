import { Router } from "express";
import axios from "axios";
import ytdl from "ytdl-core";

const router = Router();

router.get("/", (req, res) => {
  res.json("Express + TypeScript Server + me");
});

router.get("/search", async (req, res) => {
  const { q, limit } = req.query;

  const api = process.env.API_URL;
  const apikey = process.env.API_KEY;

  const url = `${api}/search?part=snippet&maxResults=${
    (limit as string) || 10
  }&q=${q}&type=video&key=${apikey}`;
  const { data } = await axios.get(url);

  res.json(data);
});

router.get("/download/:videoId", async (req, res) => {
  const { videoId } = req.params;
  const { quality, name } = req.query;

  const info = await ytdl.getInfo(videoId);

  let format = ytdl.chooseFormat(info.formats, {
    quality: "highest",
  });

  if (!format) {
    format = ytdl.chooseFormat(info.formats, {
      quality: "highestvideo",
    });
  }

  res.header("Content-Disposition", `attachment; filename="${name}"`);
  ytdl(videoId, { format }).pipe(res);
});

export default router;

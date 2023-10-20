import { Router } from "express";
import axios from "axios";
import ytdl from "ytdl-core";

const router = Router();

router.get("/", (req, res) => {
  res.json("Express + TypeScript Server + me");
});

router.get("/search", async (req, res) => {
  try {
    const { q, limit, videoType, order } = req.query;

    const api = process.env.API_URL;
    const apikey = process.env.API_KEY;

    const url = `${api}/search?part=snippet&maxResults=${
      (limit as string) || 10
    }&q=${q}&type=video&key=${apikey}&videoType=${videoType || "any"}&order=${
      order || "relevance"
    }`;
    const { data } = await axios.get(url);

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/download/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { name } = req.query;

    const info = await ytdl.getInfo(videoId);

    let format = ytdl.chooseFormat(info.formats, {
      quality: "highest",
    });

    if (!format) {
      format = ytdl.chooseFormat(info.formats, {
        quality: "highestvideo",
      });
    }

    res.setHeader("content-length", format.contentLength);
    res.setHeader("content-type", format.mimeType ?? "");
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    ytdl(videoId, { format }).pipe(res);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;

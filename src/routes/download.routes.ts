import { Router } from "express";
import ytdl from "ytdl-core";

const download_router = Router();

download_router.get("/download/:videoId", async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { name } = req.query;

    const info = await ytdl.getInfo(videoId);

    let format = ytdl.chooseFormat(info.formats, {
      quality: "highest",
    });

    if (!format) {
      res.statusCode = 400;
      return next(new Error("format not found!!"));
    }

    res.setHeader("content-length", format.contentLength);
    res.setHeader("content-type", format.mimeType ?? "");
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    ytdl(videoId, { format }).pipe(res);
  } catch (err: any) {
    return next(new Error(err.message));
  }
});

export default download_router;

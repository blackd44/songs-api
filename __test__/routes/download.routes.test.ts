import request from "supertest";
import ytdl from "ytdl-core";
import app from "@src/app";

jest.mock("ytdl-core");

describe("Your API Tests", () => {
  it("should return unknown video error", async () => {
    const res = await request(app).get("/download/unknownIdOnYoutube");

    expect(res.status).toBe(500);
  });

  it("should return unknown format error", async () => {
    (ytdl.getInfo as jest.Mock).mockResolvedValue({
      formats: [
        {
          contentLength: 356,
          mimeType: "video/mp4",
        },
      ],
    });

    const res = await request(app).get(
      "/download/your-video-id?name=your-filename"
    );

    expect(res.status).toBe(400);
    expect(res.body?.message).toEqual("format not found!!");
  });
});

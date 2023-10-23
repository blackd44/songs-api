import request from "supertest";

import app from "../src/app";

describe("Test app.ts", () => {
  test("Catch not found", async () => {
    const res = await request(app).get("/myunknownpage_12345_random");
    expect(res.body).toEqual({ message: "Api not found" });
  });
});

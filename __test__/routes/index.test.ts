import request from "supertest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import app from "@src/app";

import searched from "@mocks/search.json";

const mock = new MockAdapter(axios);

describe("Test home api", () => {
  test("get home route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Welcome to our api" });
  });
});

describe("Test search api", () => {
  afterEach(() => {
    mock.reset();
  });

  test("get with query q and limit", async () => {
    mock.onGet().reply(200, searched);

    const res = await request(app).get("/search").query({
      q: "search",
      limit: 1,
    });

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ data: searched });
  });

  test("get with error", async () => {
    mock.onGet().networkError();

    const res = await request(app).get("/search").query({
      q: "search",
      limit: "1",
    });

    expect(res.status).toEqual(400);
    expect(res.body?.message).toEqual("Error: Network Error");
  });
});

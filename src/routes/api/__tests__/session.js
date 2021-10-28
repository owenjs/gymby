import request from "supertest";
import mongoose from "mongoose";

describe("/api/session", () => {
  let server;

  beforeEach(() => {
    server = require("src").default;
  });

  afterEach(async () => {
    await server.close();
    await mongoose.disconnect();
  });

  it("should return 'Sessions'", async () => {
    const res = await request(server).get("/api/session");

    expect(res.text).toBe("Sessions...");
  });
});

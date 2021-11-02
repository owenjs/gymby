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

  it("should return 'Sessions...'", async () => {
    const res = await request(server).get("/api/session");

    expect(res.text).toBe("Sessions...");
  });

  describe("POST /start", () => {
    // should return 200 if valid request
    // should return 400 is userId is not provided
    // should return 401 if client is not logged in
    // should return 400 if user is not in the db
    // should return 400 if a session has already been started by the user and has not ended yet
    // should set the startDate to now if request is valid
    // should return the session info if request is valid
  });
});

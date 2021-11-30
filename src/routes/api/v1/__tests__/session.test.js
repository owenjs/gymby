import request from "supertest";
import mongoose from "mongoose";
import { User } from "src/models/user";
import { Session } from "src/models/session";
import bcrypt from "bcrypt";
import { AUTH_TOKEN_HEADER } from "src/constants/auth";
import { DateTime } from "luxon";

describe("/api/v1/session", () => {
  const username = "123",
    password = "pass123";

  let server, token, userInDB;

  beforeAll(() => {
    server = require("src").default;
  });

  afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Create the fake user in the test db
    const user = new User({
      username: username
    });

    // Hash their password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    token = user.generateAuthToken();

    userInDB = await user.save();
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      try {
        await collection.drop();
      } catch {} // eslint-disable-line no-empty
    }
  });

  describe("POST /start", () => {
    const exec = () => {
      return request(server).post("/api/v1/session/start").set(AUTH_TOKEN_HEADER, token).send({});
    };

    it("should return 200 if valid request", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if user is not in the db", async () => {
      await User.deleteMany({});

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if a session is already in progress for this user", async () => {
      // Start a session correctly
      await exec();
      // Try and start one again
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should set the startDate to now if valid request", async () => {
      await exec();

      const startedSession = await Session.findOne({ user: userInDB._id, endDate: null });

      const diff = new Date() - startedSession.startDate;
      // Less than 1 second
      expect(diff).toBeLessThan(1000);
    });

    it("should return the session info if request is valid", async () => {
      const res = await exec();

      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["user", "startDate"]));
    });
  });

  describe("POST /end", () => {
    let sessionInDb;

    beforeEach(async () => {
      const session = new Session({
        user: userInDB._id,
        startDate: DateTime.now().minus({ hours: 1 })
      });

      sessionInDb = await session.save();
    });

    const exec = () => {
      return request(server).post("/api/v1/session/end").set(AUTH_TOKEN_HEADER, token).send({});
    };

    it("should return 200 if valid request", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if user is not in the db", async () => {
      await User.deleteMany({});

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 404 if an active session is not found for the user", async () => {
      await Session.deleteMany({});

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should set the endDate to now if valid request", async () => {
      await exec();

      const endedSession = await Session.findById(sessionInDb._id);

      const diff = new Date() - endedSession.endDate;
      // Less than 1 second
      expect(diff).toBeLessThan(1000);
    });

    it("should set the duration to the difference between startDate and endDate in milliseconds", async () => {
      await exec();

      const endedSession = await Session.findById(sessionInDb._id);

      const diff = endedSession.endDate - endedSession.startDate;

      expect(diff).toEqual(endedSession.duration);
      // greater than 1 hour
      expect(diff).toBeGreaterThanOrEqual(60 * 60 * 1000);
      // Less then 1 hour + 1 second
      expect(diff).toBeLessThan(60 * 60 * 1000 + 1000);
    });

    it("should return the session info if valid request", async () => {
      const res = await exec();

      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["user", "startDate", "endDate", "duration"]));
    });
  });
});

import mongoose from "mongoose";
import request from "supertest";
import { User } from "src/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

describe("/api/v1/auth", () => {
  let server, payload;

  beforeEach(() => {
    server = require("src").default;
  });

  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /", () => {
    const username = "auth123",
      password = "authPass123";

    let userInDB;

    beforeEach(async () => {
      payload = {
        username: username,
        password: password
      };

      // Create the fake user in the test db
      const user = new User({
        username: username
      });

      // Hash their password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      userInDB = await user.save();
    });

    afterEach(async () => {
      await User.deleteMany({});
    });

    const exec = () => {
      return request(server).post("/api/v1/auth").send(payload);
    };

    it("should return 200 if valid request", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it("should return 400 if username is not provided", async () => {
      delete payload.username;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if password is not provided", async () => {
      delete payload.password;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if username provided does not match a username in the db", async () => {
      payload.username = "doNotMatch";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if password is not correct for the user", async () => {
      payload.password = "notCorrectPassword";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("header in the response should include the user's jwt token if valid request", async () => {
      const res = await exec();

      const token = res.headers["x-auth-token"];
      const tokenPayload = jwt.verify(token, config.get("jwPrivateKey"));

      expect(tokenPayload._id).toBe(userInDB._id.toHexString());
    });

    it("should return user's jwt token in body of request if valid", async () => {
      const res = await exec();

      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["token"]));
    });
  });
});

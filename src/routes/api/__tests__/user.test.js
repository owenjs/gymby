import request from "supertest";
import mongoose from "mongoose";
import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "src/models/user";

describe("/api/user", () => {
  let server, token, payload;

  beforeEach(() => {
    server = require("src").default;
  });

  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /", () => {
    const username = "123",
      password = "pass123";

    beforeEach(() => {
      token = "";
      payload = {
        username: username,
        password: password
      };
    });

    const exec = () => {
      return request(server).post("/api/user").set("x-auth-token", token).send(payload);
    };

    it("should return 200 is valid request", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it("should return 400 if user is already logged in", async () => {
      token = new User().generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(400);
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

    it("should return 400 if username is already taken", async () => {
      const user = new User(payload);
      await user.save();

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save user to db if valid request", async () => {
      await exec();

      const userInDB = await User.findOne({ username: username });

      expect(userInDB).toBeTruthy();
    });

    it("the user's password should be hashed in the db", async () => {
      await exec();

      const userInDB = await User.findOne({ username: username });

      const validPassword = await bcrypt.compare(password, userInDB.password);
      expect(validPassword).toBe(true);
    });

    it("should return user object if valid request", async () => {
      const res = await exec();

      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["_id", "username"]));
    });

    it("should not return the user's hash password if valid request", async () => {
      const res = await exec();

      expect(Object.keys(res.body)).not.toEqual(expect.arrayContaining(["password"]));
    });

    it("header in the response should include the user's jwt token if valid request", async () => {
      const res = await exec();

      const token = res.headers["x-auth-token"];
      const tokenPayload = jwt.verify(token, config.get("jwPrivateKey"));
      const userInDB = await User.findOne({ username: username });

      expect(tokenPayload._id).toBe(userInDB._id.toHexString());
    });
  });
});

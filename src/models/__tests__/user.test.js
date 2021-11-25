import { User } from "src/models/user";
import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = { _id: new mongoose.Types.ObjectId().toHexString() };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});

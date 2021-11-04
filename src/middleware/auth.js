import jwt from "jsonwebtoken";
import config from "config";
import { AUTH_TOKEN_HEADER } from "src/constants/auth";
import { User } from "src/models/user";

export default async (req, res, next) => {
  const token = req.header(AUTH_TOKEN_HEADER);
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    req.user = jwt.verify(token, config.get("jwPrivateKey"));

    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("User not found");

    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

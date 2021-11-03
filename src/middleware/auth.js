import jwt from "jsonwebtoken";
import config from "config";
import { AUTH_TOKEN_HEADER } from "src/constants/auth";

export default (req, res, next) => {
  const token = req.header(AUTH_TOKEN_HEADER);
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    req.user = jwt.verify(token, config.get("jwPrivateKey"));
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

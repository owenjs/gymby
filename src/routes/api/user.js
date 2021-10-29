import { Router } from "express";
import { User } from "src/models/user";
import bcrypt from "bcrypt";
const router = Router();

router.post("/", async (req, res) => {
  let token = req.header("x-auth-token");
  if (token) return res.status(400).send("User already logged in");

  if (!req.body.username) return res.status(400).send("Username is required");
  if (!req.body.password) return res.status(400).send("Password is required");

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Username already taken");

  user = new User({
    username: req.body.username,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  token = user.generateAuthToken();
  return res.header("x-auth-token", token).send(await user.save());
});

export default router;

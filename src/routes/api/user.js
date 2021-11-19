import { Router } from "express";
import { User, validateUser } from "src/models/user";
import validate from "src/middleware/validate";
import bcrypt from "bcrypt";
const router = Router();

// Test
router.post("/", validate(validateUser), async (req, res) => {
  let token = req.header("x-auth-token");
  if (token) return res.status(400).send("User already logged in");

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Username already taken");

  user = new User({
    username: req.body.username
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  token = user.generateAuthToken();

  user = await user.save();

  return res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username
  });
});

export default router;

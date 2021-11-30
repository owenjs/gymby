import { Router } from "express";
import { User, validateUser } from "src/models/user";
import validate from "src/middleware/validate";
import bcrypt from "bcrypt";
const router = Router();

router.post("/", validate(validateUser), async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({ token });
});

export default router;

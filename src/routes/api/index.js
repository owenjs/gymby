import { Router } from "express";
import session from "src/routes/api/session";
import user from "src/routes/api/user";
import auth from "src/routes/api/auth";
const router = Router();

router.use("/session", session);
router.use("/user", user);
router.use("/auth", auth);

export default router;

import { Router } from "express";
import session from "src/routes/api/v1/session";
import user from "src/routes/api/v1/user";
import auth from "src/routes/api/v1/auth";
const router = Router();

router.use("/session", session);
router.use("/user", user);
router.use("/auth", auth);

export default router;

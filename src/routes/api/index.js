import { Router } from "express";
import sessions from "src/routes/api/sessions";
import user from "src/routes/api/user";
import auth from "src/routes/api/auth";
const router = Router();

router.use("/sessions", sessions);
router.use("/user", user);
router.use("/auth", auth);

export default router;

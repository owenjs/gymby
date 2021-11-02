import { Router } from "express";
import sessions from "src/routes/api/sessions";
import user from "src/routes/api/user";
const router = Router();

router.use("/sessions", sessions);
router.use("/user", user);

export default router;

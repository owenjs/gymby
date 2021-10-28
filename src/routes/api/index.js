import { Router } from "express";
import session from "src/routes/api/session";
const router = Router();

router.use("/session", session);

export default router;

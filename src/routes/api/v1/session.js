import { Router } from "express";
import auth from "src/middleware/auth";
import { Session } from "src/models/session";
const router = Router();

router.get("/", (req, res) => {
  res.send("Sessions...");
});

// Start Session
router.post("/start", auth, async (req, res) => {
  // Is a session already in progress?
  const currentSession = await Session.findOne({ user: req.user._id, endDate: null });
  if (currentSession) return res.status(400).send("Session already in progress");

  // Start the session
  const session = new Session({
    user: req.user._id
  });

  res.send(await session.save());
});

// End Session
router.post("/end", auth, async (req, res) => {
  const session = await Session.findOne({ user: req.user._id, endDate: null });
  if (!session) return res.status(404).send("Session for user not found");

  session.endDate = new Date();
  session.duration = session.endDate - session.startDate;

  res.send(await session.save());
});

export default router;

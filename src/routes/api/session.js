import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Sessions...");
});

// Start Session
router.post("/start", (req, res) => {
  res.send("Start Session...");
});

// End Session
router.post("/end", (req, res) => {
  res.send("End Session...");
});

export default router;

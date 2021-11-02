import logger from "src/logger";

export default (err, req, res) => {
  logger.error("Router Error:", err.message || err);

  res.status(500).send("Something failed.");
};

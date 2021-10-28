import "dotenv/config.js";
import logger from "src/logger";
import express from "express";
import startup from "src/startup";

const app = express();

startup(app);

let port = process.env.PORT || 3000;

// If in the test environment then let the operating system assign an arbitrary
// unused port to avoid port collisions in parallel testing.
if (app.get("env") === "test") {
  port = 0;
}

const server = app.listen(port, () => {
  const { address, port } = server.address();
  logger.info(`Listening at http://[${address}]:${port}`);
});

export default server;

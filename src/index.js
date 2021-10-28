import "dotenv/config.js";
import logger from "src/logger";
import express from "express";
import startup from "src/startup";

const app = express();

startup(app);

const server = app.listen(process.env.PORT || 3000, () => {
  const { address, port } = server.address();
  logger.info(`Listening at http://[${address}]:${port}`);
});

export default server;

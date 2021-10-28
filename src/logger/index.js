import { createLogger, transports } from "winston";

const logger = createLogger({
  transports: [new transports.Console({ handleExceptions: true, colorize: true, prettyPrint: true })]
});

export default logger;

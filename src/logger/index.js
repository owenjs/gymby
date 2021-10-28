import { createLogger, transports, format } from "winston";
const { combine, timestamp, colorize, printf } = format;

process.on("unhandledRejection", reason => {
  throw reason;
});

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(colorize(), timestamp(), myFormat),
  transports: [new transports.Console({ handleExceptions: true })],
  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
  exitOnError: false
});

export default logger;

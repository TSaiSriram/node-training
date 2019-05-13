const winston = require("winston");
const loggerLevel = process.env.LOGGER_LEVEL || "info" || "error";
const t = new Date() + "UTC";

let alignColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.label({
    label: `[APP LOG]`
  }),
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  }),
  winston.format.printf(
    info => `${info.label} ${info.timestamp} ${info.level}: ${info.message}`
  )
);

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
  transports: [
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
      handleExceptions: true
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      level: loggerLevel
    }),
    new winston.transports.Console({
      level: loggerLevel
    })
  ]
});

module.exports = logger;

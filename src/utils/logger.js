const winston = require("winston");
require("winston-daily-rotate-file");
require("winston-mongodb");

var dailyRotateFile = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  dirname: "logs",
  timestamp: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  prettyPrint: true,
  json: true,
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/log_db",
      collection: "userLog",
      capped: true,
      level: "verbose",
    }),
    //new winston.transports.File({ filename: 'combined.log' }),
  ],
  // format: winston.format.combine(
  //     winston.format.colorize(),
  //     winston.format.json()
  //   ),
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false,
});
const winston = require('winston');
require('winston-daily-rotate-file');

var dailyRotateFile = new (winston.transports.DailyRotateFile)({
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    dirname: 'logs',
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
  });

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
     // new winston.transports.File({ filename: 'combined.log' }),
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false,
});

module.exports = logger;
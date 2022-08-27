const winston = require('winston');

function createDevLogger() {
  const myFormat = winston.format.printf((data) => {
    return `[${new Date().toUTCString()}] ${data.level}: ${data.stack} || ${
      data.message
    }`;
  });
  const logger = winston.createLogger({
    level: process.env.NODE_LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      myFormat
    ),
    transports: [new winston.transports.File({ filename: './logs/app.log' })],
  });
  return logger;
}
function createProdLogger() {
  const logger = winston.createLogger({
    level: process.env.NODE_LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    transports: [new winston.transports.File({ filename: './logs/app.log' })],
  });
  return logger;
}

let logger = null;
if (process.env.NODE_ENV == 'development') {
  logger = createDevLogger();
} else {
  logger = createProdLogger();
}

module.exports = logger;
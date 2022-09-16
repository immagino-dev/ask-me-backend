import winston from 'winston';

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'debug',
      transports: [
        new winston.transports.Console({ format: winston.format.json({ space: 1 }) }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'warn', format: winston.format.combine(winston.format.timestamp(), winston.format.json({ space: 1 })) }),
      ]
    })
  }
}
export default new Logger().logger;
let appRoot = require('app-root-path');
let winston = require('winston');

require('winston-daily-rotate-file');

let environment = process.env.NODE_ENV;

let transport = new (winston.transports.DailyRotateFile)({
    filename: `${appRoot}/logs/${environment}_%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '10d',
    colorize: true
});

let logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        transport
    ]
});


module.exports = logger;
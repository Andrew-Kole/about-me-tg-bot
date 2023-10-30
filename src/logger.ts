import pino from "pino"

/**
 * Creating logger instance with chosen options.
 */
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
});

export default logger;

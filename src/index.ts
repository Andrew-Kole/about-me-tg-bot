import bot from './bot';
import logger from "./logger";

/**
 * Starting our bot.
 */
bot.launch()
    .then(() => {
        logger.info('Bot started.')
    });
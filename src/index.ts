import bot from './bot';
import logger from "./logger";
import connectDB from "./utils/db.connect";
import cronWeather from "./utils/cron.weather";

/**
 * Starting our bot.
 */
bot.launch()
    .then(() => {
        logger.info('Bot started.')
    });

connectDB();
cronWeather();

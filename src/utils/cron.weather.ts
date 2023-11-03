import * as cron from "node-cron"
import Subscription from "../models/subscribe.model";
import logger from "../logger";
import {fetchWeather} from "../services/weather.client";
import bot from "../bot"
import {weatherReplyPrepare} from "../config/messages";


const cronWeather = async () => {
    logger.info('executed');
    try{
        const currentTime = new Date().toLocaleTimeString('pl-PL', {hour12:false, hour:'2-digit', minute:'2-digit'});
        const subscriptions = await Subscription.find({time_subscribe: currentTime}).exec();
        for (const subscription of subscriptions) {
            const chatId = subscription.chat_id;
            const latitude = subscription.latitude;
            const longitude = subscription.longitude;
            logger.info(`executed chat: ${chatId}, latitude ${latitude}, longitude ${longitude}`);
            const data = await fetchWeather(latitude, longitude, chatId);
            const message = await weatherReplyPrepare(data);
            await bot.telegram.sendMessage(chatId, message, {parse_mode: 'HTML'});
            logger.info('message sent')
        }
    }
    catch(error) {
        logger.error({error}, 'failed')
    }
}

cron.schedule('* * * * *', cronWeather);
export default cronWeather;
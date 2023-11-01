import { fetchWeather } from "../../services/weather.client";
import logger from "../../logger";
import { weatherReplyPrepare, randomMessageDetected, dateDetectedReply } from "../../config/messages";

/**
 * Handler that reacts on messages and locations
 * @param ctx - telegraf context
 */
export async function weatherListener(ctx){
    const traceId = ctx.update.update_id;
    if(ctx.message.text && !ctx.message.text.startsWith('/')){
        const hasDate = ctx.message.text.match(/\b\d{4}-\d{2}-\d{2}\b/);
        if (hasDate){
            logger.info({traceId}, 'new date provided')
            ctx.replyWithHTML(dateDetectedReply, {parse_mode: 'HTML'});
        }
        else {
            logger.info({traceId}, 'just random message provided.')
            ctx.replyWithHTML(randomMessageDetected, {parse_mode: 'HTML'})
        }
    }
    else if(ctx.message.location){
        const latitude = ctx.message.location.latitude;
        const longitude = ctx.message.location.longitude;
        try {
            const weatherData = await fetchWeather(latitude, longitude, traceId)
            const weatherMessage = weatherReplyPrepare(weatherData);
            logger.info({weatherMessage, traceId }, 'Got weather');
            ctx.replyWithHTML(weatherMessage, {parse_mode: 'HTML'})
        }
        catch (error) {
            logger.error({error, traceId});
            ctx.reply('Error');
        }
    }
}

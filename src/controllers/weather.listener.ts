import { fetchWeather } from "../services/weather.client";
import logger from "../logger";

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
            ctx.replyWithHTML('I saw you interested in this <b>date</b>, give me location and I could tell you weather there that time, <s>but after research i discovered it is paid information and i will tell you current weather</s>', {parse_mode: 'HTML'});
        }
        else {
            logger.info({traceId}, 'just random message provided.')
            ctx.replyWithHTML('<i> also think so</i>')
        }
    }
    else if(ctx.message.location){
        const latitude = ctx.message.location.latitude;
        const longitude = ctx.message.location.longitude;
        try {
            const weatherMessage = await fetchWeather(latitude, longitude, traceId)
            logger.info({weatherMessage, traceId }, 'Got weather');
            ctx.replyWithHTML(weatherMessage)
        }
        catch (error) {
            logger.error({error, traceId});
            ctx.reply('Error');
        }
    }
}

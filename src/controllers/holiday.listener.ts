import { fetchHolidays } from "../services/holiday.client";
import logger from "../logger";

export async function holidayListener(ctx){
    const traceId = ctx.update.update_id;
    const countryCode = ctx.message.text.split(' ')[0].toUpperCase();
    logger.info({ traceId }, 'press flag handled');
    try {
        const holidayData = await fetchHolidays(countryCode, traceId.toString());
        ctx.reply(holidayData);
        logger.info({traceId}, 'made request');
    }
    catch (error){
        logger.error({error, traceId});
        ctx.reply('Error.')
    }
}
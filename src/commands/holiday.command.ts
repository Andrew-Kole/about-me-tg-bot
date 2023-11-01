import {Context} from "telegraf";
import logger from "../logger";
import { flags } from "../config/flags";

/**
 * this command executes holiday command that shows holidays in chosen location
 * @param ctx - telegraf context
 */
export const holidayCommand = async (ctx: Context) => {
    const message = 'Choose country which holidays do want to know about';
    const traceId: number = ctx.update.update_id;
    logger.info({ traceId }, 'Command holiday was executed.');
    const keyboard = {
        keyboard: flags.map(flag => [flag]),
        resize_keyboard: true,
        one_time_keyboard: true,
        selective: true,
        traceId: traceId,
    };
    await ctx.reply(message, { reply_markup: keyboard });
};
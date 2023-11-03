import {subscribeScene} from "./scenes/subscribe.scene"
import logger from "../logger";

/**
 * Command /subscribe
 * @param ctx - telegraf context
 */
export const subscribeCommand = async (ctx) => {
    const traceId = ctx.update.update_id;
    logger.info({traceId},'subscribe command was executed.')
    await ctx.reply('Welcome to subscription! After it yuo will get daily weather information.')
    await ctx.scene.enter('subscribeScene');
}


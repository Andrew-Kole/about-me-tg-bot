import { Context } from "telegraf";

/**
 * /about command, it just answers a message after execution.
 * @param ctx - telegraf Context
 */
export const aboutCommand = async (ctx: Context) => {
    const message = "My name is Andrew. I'm learning NodeJS and TypeScript. It's my first telegram bot, that tells about me."
    await ctx.reply(message);
};
import { Telegraf } from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "./config";
import { aboutCommand,linksCommand } from "./commands";
import logger from "./logger";
import { fetchHolidays } from "./services/holideay_api_service";

/**
 * Bot instance.
 */
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
const flags = ['ua Ukraine', 'pl Poland', 'us United States', 'gb United Kingdom', 'fr France', 'de Germany', 'in India', 'jp Japan'];

/**
 * Start command.
 */
bot.start((ctx) => {
    const greetingsMessage = "Greetings, my friend! Take a look to /help command and you'll find there commands to use me. Also you can see below list of countries which holidays info for today you can get";
    const keyboard = {
        keyboard: flags.map(flag => [flag]),
        resize_keyboard: true,
        one_time_keyboard: true,
        selective: true,
    };
    logger.info('Start command executed.');
    ctx.reply(greetingsMessage, { reply_markup: keyboard });
});

/**
 * Help command.
 */
bot.help((ctx) => {
    const helpMessage = "'/about' - provides some information about me\n'/links' - provides my profile links on GitHub and LinkedIn";
    logger.info('Help command executed.')
    ctx.reply(`List of commands:\n${helpMessage}`);
});

/**
 * Our custom commands register.
 */
bot.command('about', aboutCommand);
bot.command('links', linksCommand);

bot.hears(flags, async (ctx) => {
    const countryCode = ctx.message.text.split(' ')[0].toUpperCase();
    const traceId: number = Math.floor(Math.random() * 100) + 1;
    logger.info({ traceId }, 'press flag handled')
    try {
        const holidayData = await fetchHolidays(countryCode, traceId.toString());
        ctx.reply(holidayData);
        logger.info({traceId}, 'made request')
    }
    catch (error){
        logger.error({error, traceId});
        ctx.reply('Error.')
    }
});

export default bot;
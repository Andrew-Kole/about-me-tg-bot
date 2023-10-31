import { Telegraf} from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "./config";
import {aboutCommand, holidayCommand, linksCommand} from "./commands";
import logger from "./logger";
import {flags} from "./config/flags";
import {holidayListener} from "./controllers/holiday.listener";

/**
 * Bot instance.
 */
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

/**
 * Start command.
 */
bot.start((ctx) => {
    const greetingsMessage = "Greetings, my friend! Take a look to /help command and you'll find there commands to use me. Also you can see below list of countries which holidays info for today you can get";
    logger.info('Start command executed.');
    ctx.reply(greetingsMessage);
});

/**
 * Help command.
 */
bot.help((ctx) => {
    const helpMessage = "'/about' - provides some information about me\n'/links' - provides my profile links on GitHub and LinkedIn\n'/holiday' - shows selectable flags of the countries, after select one of them you'll get information about holidays in chosen country";
    logger.info('Help command executed.')
    ctx.reply(`List of commands:\n${helpMessage}`);
});

/**
 * Our custom commands register.
 */
bot.command('about', aboutCommand);
bot.command('links', linksCommand);
bot.command('holiday', holidayCommand);

bot.hears(flags, holidayListener);

export default bot;
import {Scenes, session, Telegraf} from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "./config";
import {aboutCommand, holidayCommand, linksCommand} from "./commands";
import logger from "./logger";
import {flags} from "./config/flags";
import {holidayListener} from "./commands/listeners/holiday.listener";
import {weatherListener} from "./commands/listeners/weather.listener";
import {subscribeCommand} from "./commands/subscribe.command";
import subscribeScene from "./commands/scenes/subscribe.scene";

/**
 * Bot instance.
 */
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
const stage = new Scenes.Stage([subscribeScene])
bot.use(session());
bot.use(stage.middleware());

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
    const helpMessage = "'/about' - provides some information about me\n'/links' - provides my profile links on GitHub and LinkedIn\n'/holiday' - shows selectable flags of the countries, after select one of them you'll get information about holidays in chosen country\nIf you send me location you'll got information about weather in this location";
    logger.info('Help command executed.')
    ctx.reply(`List of commands:\n${helpMessage}`);
});

/**
 * Our custom commands register.
 */
bot.command('about', aboutCommand);
bot.command('links', linksCommand);
bot.command('holiday', holidayCommand);
bot.command('subscribe', subscribeCommand);


bot.hears(flags, holidayListener);
bot.on('message', weatherListener);

export default bot;
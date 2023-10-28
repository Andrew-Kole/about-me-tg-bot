import { Telegraf } from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "./config";
import { aboutCommand,linksCommand } from "./commands";

/**
 * Bot instance.
 */
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

/**
 * Start command.
 */
bot.start((ctx) => {
    const greetingsMessage = "Greetings, my friend! Take a look to /help command and you'll find there commands to use me.";
    ctx.reply(greetingsMessage);
});

/**
 * Help command.
 */
bot.help((ctx) => {
    const helpMessage = "'/about' - provides some information about me\n'/links' - provides my profile links on GitHub and LinkedIn";
    ctx.reply(`List of commands:\n${helpMessage}`);
});

/**
 * Our custom commands register.
 */
bot.command('about', aboutCommand);
bot.command('links', linksCommand);

export default bot;
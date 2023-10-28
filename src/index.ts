import bot from './bot';

/**
 * Starting our bot.
 */
bot.launch()
    .then(() => {
        console.log('Bot is running.')
    });
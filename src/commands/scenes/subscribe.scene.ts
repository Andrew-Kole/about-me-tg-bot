import {Scenes} from "telegraf";
import logger from "../../logger";
import {dbStore} from "../../utils/db.store";

const {WizardScene} = Scenes;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/
/**
 * Definition and setting up telegraf scenes
 */
export const subscribeScene = new WizardScene(
    'subscribeScene',
    async (ctx) => {
        ctx.session.traceId = ctx.update.update_id;
        const traceId = ctx.session.traceId;
        logger.info({traceId}, 'First step executed!')
        await ctx.reply('Provide time,please in format HH:mm');
        return ctx.wizard.next();
    },
    async (ctx:any) => {
        const traceId = ctx.session.traceId;
        const timeInput = ctx.message.text.trim();
        if(!TIME_REGEX.test(timeInput)){
            await ctx.reply('Time input is invalid, provide it in format HH:mm(for example 09:00)');
            logger.error({traceId},'Wrong time format');
            return;
        }
        ctx.session.time = timeInput;
        logger.info({traceId}, 'time stored to session.')
        await ctx.reply('Share your location or location where weather is interesting for you.');
        return ctx.wizard.next();
    },
    async (ctx) => {
        const traceId = ctx.session.traceId;
        if(!ctx.message.location){
            logger.error({traceId}, 'No location shared.')
            ctx.reply('Share please location!');
            return;
        }
        const chatId = ctx.message.chat.id;
        const data = ctx.message
        const time = ctx.session.time;
        const latitude = ctx.message.location.latitude;
        const longitude = ctx.message.location.longitude;
        await dbStore(chatId, time, latitude, longitude);
        logger.info({traceId, data}, 'data stored')
        await ctx.reply(`Thanks for subscription, you will get daily weather information at ${time} UTC, for your location.`);
        return ctx.scene.leave();
    }
);

/**
 * Interruption command for scenario
 */
subscribeScene.command('cancel', (ctx)=> {
    const traceId = ctx.session.traceId;
    logger.info({traceId}, 'user have interrupted subscription')
    ctx.reply('Sorry you interrupted our subscription.');
    ctx.scene.leave();
});

export default subscribeScene;


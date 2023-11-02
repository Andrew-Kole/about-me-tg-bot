import {Scenes} from "telegraf";

const {WizardScene} = Scenes;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/

export const subscribeScene = new WizardScene(
    'subscribeScene',
    async (ctx) => {
        await ctx.reply('Provide time,please in format HH:mm');
        return ctx.wizard.next();
    },
    async (ctx:any) => {
        const timeInput = ctx.message.text.trim();
        if(!TIME_REGEX.test(timeInput)){
            await ctx.reply('Time input is invalid, provide it in format HH:mm(for example 09:00)');
            return;
        }
        ctx.session.time = timeInput;
        await ctx.reply('Share your location or location where weather is interesting for you.');
        return ctx.wizard.next();
    },
    async (ctx) => {
        const userId = ctx.message.from.id;
        const chatId = ctx.message.chat.id;
        const time = ctx.session.time;
        const latitude = ctx.message.location.latitude;
        const longitude = ctx.message.location.longitude;
        await ctx.reply(`User ${userId}, chat ${chatId}, time ${time}, latitude ${latitude} longitude ${longitude}`);
        return ctx.scene.leave();
    }
);


subscribeScene.command('cancel', (ctx)=> ctx.scene.leave());

export default subscribeScene;


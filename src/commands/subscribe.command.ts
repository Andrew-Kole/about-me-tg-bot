import {subscribeScene} from "./scenes/subscribe.scene"

export const subscribeCommand = async (ctx) => {
    await ctx.reply('Welcome to subscription! After it yuo will get daily weather information.')
    await ctx.scene.enter('subscribeScene');
}


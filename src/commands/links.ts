import { Context } from "telegraf";
import { GITHUB_LINK,LINKEDIN_LINK } from "../config";

/**
 * /links command, it answers with my GitHub and LinkedIn profile links, thay are written in .env file and imported from config/index.ts
 * @param ctx - telegraf Context
 */
export const linksCommand = async (ctx: Context) => {
    await ctx.reply(`My GitHub Link is:\n${GITHUB_LINK}\nand LinkedIn link is:\n${LINKEDIN_LINK}`);
}
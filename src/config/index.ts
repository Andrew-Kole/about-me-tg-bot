import * as dotenv from 'dotenv';
dotenv.config();


/**
 * Bot settings from .env file
 */
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
export const GITHUB_LINK =process.env.GITHUB_LINK || '';
export const LINKEDIN_LINK = process.env.LINKEDIN_LINK || '';
export const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY || '';
export const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY || '';
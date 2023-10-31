import axios from "axios";
import logger from "../logger";
import { OPEN_WEATHER_API_KEY } from "../config";

/**
 * Makes request to openWeather api and returns weather and temperature in chosen location
 * @param latitude - latitude of location
 * @param longitude - longitude of location
 * @param traceId - for logging
 */
export const fetchWeather = async (latitude, longitude, traceId) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const params = {
        params: {
            lat: latitude,
            lon: longitude,
            appid: OPEN_WEATHER_API_KEY,
        }
    };
    try {
        const res = await axios.get(apiUrl, params);
        const weatherData = res.data;
        const message = `<s>I don't know what to say</s>, so <u>I'll tell you weather</u>. So:\n<i>${weatherData.weather[0].description}</i>\nTemperature:<pre style="background-color: #f2f2f2; padding: 10px; border-radius: 5px;">${Math.round(weatherData.main.temp - 273.15)}°C</pre>`;
        logger.info({ message, traceId}, 'Weather got');
        return message;
    }
    catch (error) {
        logger.error({error, traceId}, 'Error get weather');
        throw new Error('Error get weather.');
    }
}
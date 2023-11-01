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
        logger.info({ weatherData, traceId}, 'Weather got');
        return weatherData;
    }
    catch (error) {
        logger.error({error, traceId}, 'Error get weather');
        throw new Error('Error get weather.');
    }
}
import axios from "axios";
import { ABSTRACT_API_KEY } from "../config";
import logger from "../logger";

export const fetchHolidays = async (countryCode: string, traceId: string) => {
    const apiUrl = `https://holidays.abstractapi.com/v1/`
    const currentDate = new Date();
    const options = {
        params: {
            api_key: ABSTRACT_API_KEY,
            country: countryCode,
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate(),
        }
    };
    try {
        const res = await axios.get(apiUrl, options);
        const holiday = res.data[0];
        const message = holiday? `Today's holiday in ${holiday.location}: ${holiday.name}` : `No holiday today in ${countryCode}`;
        logger.info({message, res: res.data, traceId}, 'Get data success');
        return message;
    }
    catch (error) {
        logger.error({error, traceId}, 'Error get data');
        throw new Error('Error to get holidays information');
    }
};
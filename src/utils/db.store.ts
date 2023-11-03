import Subscription from "../models/subscribe.model";
import connectDB from "./db.connect";


/**
 * util for storing data to the database
 * @param chatId - chat/user id
 * @param timeSubscribe - time provided by user
 * @param latitude - latitude of geo
 * @param longitude - longitude of geo
 */
export const dbStore = async (chatId: number , timeSubscribe: string, latitude: number, longitude:number) => {
    const subscription = new Subscription({
        chat_id: chatId,
        time_subscribe: timeSubscribe,
        latitude: latitude,
        longitude: longitude,
    })
    await connectDB();
    await subscription.save();
}
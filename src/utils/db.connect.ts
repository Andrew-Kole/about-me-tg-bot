import mongoose from 'mongoose';
import {MONGO_URI} from "../config";
import logger from "../logger";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {});
        logger.info('db connected');
    }
    catch(error) {
        logger.error({error}, "db haven't connected");
    }
}

export default connectDB;
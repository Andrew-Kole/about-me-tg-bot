import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
    chat_id: Number,
    time_subscribe: String,
    latitude: Number,
    longitude: Number,
});

const Subscription = mongoose.model('Subscription', subscribeSchema);

export default Subscription;
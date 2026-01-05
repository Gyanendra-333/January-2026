import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Url", urlSchema);
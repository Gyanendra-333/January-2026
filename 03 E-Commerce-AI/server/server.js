import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is Running ${PORT} ✅`);
});
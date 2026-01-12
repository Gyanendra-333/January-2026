import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { createTables } from './utils/createTable.js';
import { ErrorMiddleware } from './middleware/errorMidleware.js';

// routes 
import authRouter from './routes/authRoutes.js';

const app = express();

config({ path: './config/config.env' });

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
}));

app.use("/api/v1/auth", authRouter);

createTables();
app.use(ErrorMiddleware)


export default app;

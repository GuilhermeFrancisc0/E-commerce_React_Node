import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const allowedOrigins = [
    `http://127.0.0.1:${process.env.VITE_HTTP_PORT}`,
    `http://localhost:${process.env.VITE_HTTP_PORT}`
];

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
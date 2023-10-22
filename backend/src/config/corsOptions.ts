import { CorsOptions } from 'cors';

const allowedOrigins = [
    'http://127.0.0.1:5173',
    `http://localhost:${process.env.HTTP_PORT}`
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
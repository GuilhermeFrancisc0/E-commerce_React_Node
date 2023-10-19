import { CorsOptions } from 'cors';

const whitelist = [
    'http://127.0.0.1:5173',
    `http://localhost:${process.env.HTTP_PORT}`
];

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
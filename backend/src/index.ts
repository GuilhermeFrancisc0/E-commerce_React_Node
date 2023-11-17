import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { corsOptions } from './config/corsOptions';
import { credentials, verifyJWT } from './middlewares/auth';
import { errorHandler } from './middlewares/error';
import { logger } from './middlewares/log';
import Routes from './routes';

dotenv.config();

mongoose.connect(process.env.MONGO_URL || '')
    .then(con => console.log(`MongoDB conectado: ${con.connection.host}`))
    .catch(e => console.log('MongoDB não conectado! Erro:', e));

const app = express();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(verifyJWT);

app.use(Routes);

app.use(errorHandler);

app.listen(process.env.HTTP_PORT, () => {
    console.log(`Rodando na porta ${process.env.HTTP_PORT}`);
});
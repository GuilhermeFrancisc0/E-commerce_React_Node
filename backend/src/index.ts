import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { corsOptions } from './config/corsOptions';
import { errorHandler } from './middlewares/error';
import { logger } from './middlewares/log';

dotenv.config();

const app = express();

app.use(logger);

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use(errorHandler);

app.listen(process.env.HTTP_PORT, () => {
    console.log(`Rodando na porta ${process.env.HTTP_PORT}`);
});
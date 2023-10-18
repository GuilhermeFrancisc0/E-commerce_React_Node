import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.listen(process.env.HTTP_PORT, () => {
    console.log(`Rodando na porta ${process.env.HTTP_PORT}`);
});
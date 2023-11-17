import { format } from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const __dirname = path.resolve();

export const logEvents = async (msg: string, logName: string) => {
    const dateTime = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, 'src', 'logs')))
            await fs.promises.mkdir(path.join(__dirname, 'src', 'logs'));

        await fs.promises.appendFile(path.join(__dirname, 'src', 'logs', logName), logItem);
    } catch (e) {
        console.error(e);
    }
}

export const logger = (req: Request, _: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'req.log');
    next();
}
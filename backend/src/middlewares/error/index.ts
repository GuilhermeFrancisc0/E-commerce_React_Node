import { NextFunction, Request, Response } from 'express';

import { logEvents } from '../log';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name}: ${err.message}`, 'err.txt');
    res.status(500).send(err.message);
    console.error(err.stack);
}
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { allowedOrigins } from '../../config/corsOptions';

const publicPaths = [
    "/",
    "/api/signIn",
    "/api/signOut",
    "/api/refreshToken",
];

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const {
        headers: { authorization },
        url,
        method
    } = req

    if (publicPaths.includes(url) || (url === "/api/user" && method === "POST"))
        return next();

    try {
        if (!authorization)
            throw new Error("Authorization not exists");

        const [, token] = authorization.split(" ");

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '');

        next();
    } catch (e: any | Error) {
        res.status(401).send({ message: e.message });
    }
}

export const credentials = (req: Request, res: Response, next: NextFunction) => {
    const { origin } = req.headers;

    if (origin && allowedOrigins.includes(origin))
        res.header('Access-Control-Allow-Credentials', 'true');

    next();
}
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { allowedOrigins } from '../../config/corsOptions';
import { User } from '../../models/user';

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

export const verifyPermissions = (permissions: User['permissions']) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { cookies } = req;

        try {
            if (!cookies?.jwt)
                throw new Error('Cookie JWT não Encontrado!');

            const refreshToken = cookies.jwt;

            const user = jwt.decode(refreshToken) as Omit<User, 'password' | 'refreshToken'>;

            const hasPermission = user.permissions.some(p => permissions.includes(p));

            if (!hasPermission)
                throw new Error('Usuário não tem Permissão para Acessar o Recurso!');

            next();
        } catch (e: any | Error) {
            res.status(403).send({ message: e.message });
        }
    }
}
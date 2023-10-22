import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const publicPaths = ["/", "/api/signIn", "api/signOut"];

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const {
        headers: { authorization },
        url,
        method
    } = req

    if (publicPaths.includes(url) || (url === "/api/user" && method === "POST")) {
        return next();
    }

    if (!authorization) {
        return res.sendStatus(401);
    }

    const [, token] = authorization.split(" ");

    console.log('verifyJWT-token', token);
    
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '');
    console.log('verifyJWT-user', user);

    if (!user)
        return res.sendStatus(403);

    req.headers.loggedUser = JSON.stringify(user);

    next();
}

import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { DecodedToken, UserModel } from '../../models/user';

export const signIn = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            throw new Error('Campos "Usuário" e "Senha" são obrigatórios!');

        const foundUser = await UserModel.findOne({ username });

        const passwordMatch = await bcrypt.compare(password, foundUser?.password || '');

        if (!foundUser || !passwordMatch)
            throw new Error('"Usuário" ou "Senha" incorretos!');

        const foundUserInfo: DecodedToken = {
            email: foundUser.email,
            username: foundUser.username,
            permissions: foundUser.permissions,
        }

        const accessToken = jwt.sign(
            foundUserInfo,
            process.env.ACCESS_TOKEN_SECRET || '',
            { expiresIn: '4h' }
        );

        const refreshToken = jwt.sign(
            foundUserInfo,
            process.env.REFRESH_TOKEN_SECRET || '',
            { expiresIn: '1d' }
        );

        await UserModel.findByIdAndUpdate(foundUser._id, { refreshToken });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie('loggedUserId', foundUser._id, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const signOut = async (req: Request, res: Response) => {
    try {
        const { cookies } = req;

        if (!cookies.jwt && !cookies.loggedUserId)
            return res.sendStatus(204);

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            res.clearCookie('loggedUserId', { httpOnly: true, sameSite: 'none', secure: true });

            return res.sendStatus(204);
        }

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.clearCookie('loggedUserId', { httpOnly: true, sameSite: 'none', secure: true });

        res.sendStatus(204);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        const { cookies } = req;

        if (!cookies?.jwt)
            throw new Error('Cookie JWT não Encontrado!');

        const refreshToken = cookies.jwt;

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        if (!foundUser)
            throw new Error('Usuário não Encontrado!');

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', (e: any) => {
            if (e)
                throw new Error('Tempo de Acesso Expirado! Por favor Realize o Login Novamente.');
        });

        const foundUserInfo: DecodedToken = {
            email: foundUser.email,
            username: foundUser.username,
            permissions: foundUser.permissions,
        }

        const accessToken = jwt.sign(
            foundUserInfo,
            process.env.ACCESS_TOKEN_SECRET || '',
            { expiresIn: '30s' }
        );

        res.json({ accessToken });
    } catch (e: any | Error) {
        res.status(403).send({ message: e.message });
    }
}
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { data } from '../user';

export const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ 'message': 'Campos "Usuário" e "Senha" são obrigatórios!' });

    const foundUser = data.users.find(u => u.username === username);
    const passwordMatch = await bcrypt.compare(password, foundUser?.password || '');

    if (!foundUser || !passwordMatch)
        return res.status(400).json({ 'message': '"Usuário" ou "Senha" incorretos!' });

    const foundUserInfo: Omit<User, 'password' | 'refreshToken'> = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        permissions: foundUser.permissions,
    }

    const accessToken = jwt.sign(
        foundUserInfo,
        process.env.ACCESS_TOKEN_SECRET || '',
        { expiresIn: '30s' }
    );

    const refreshToken = jwt.sign(
        foundUserInfo,
        process.env.REFRESH_TOKEN_SECRET || '',
        { expiresIn: '1d' }
    );

    data.setUsers(
        data.users.map(u => {
            if (u.id === foundUser.id)
                return { ...u, refreshToken };
            return u;
        })
    );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ accessToken  });
}

export const signOut = async (req: Request, res: Response) => {
    const { cookies } = req;

    if (!cookies?.jwt)
        return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const foundUser = data.users.find(u => u.refreshToken === refreshToken);

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.sendStatus(204);
    }

    data.setUsers(
        data.users.map(u => {
            if (u.id === foundUser.id)
                return { ...u, refreshToken: '' };
            return u;
        })
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
}

export const handleRefreshToken = (req: Request, res: Response) => {
    const { cookies } = req;

    try {
        if (!cookies?.jwt)
            throw new Error('Cookie JWT não Encontrado!');

        const refreshToken = cookies.jwt;

        const foundUser = data.users.find(u => u.refreshToken === refreshToken);

        if (!foundUser)
            throw new Error('Refresh Token não Encontrado!');

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', (e: any) => {
            if (e)
                throw new Error('Tempo de Acesso Expirado! Por favor Realize o Login Novamente.');
        });

        const foundUserInfo: Omit<User, 'password' | 'refreshToken'> = {
            id: foundUser.id,
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
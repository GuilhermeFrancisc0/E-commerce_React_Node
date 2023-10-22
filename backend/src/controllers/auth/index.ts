import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { data } from '../user';

export const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ 'message': 'Campos "Usuário" e "Senha" são obrigatórios!' });

    const foundUser = data.users.find(u => u.username === username);
    const passwordMatch = await bcrypt.compare(password, foundUser?.password || '');

    if (!foundUser || !passwordMatch)
        return res.status(401).json({ 'message': '"Usuário" ou "Senha" incorretos!' });

    const accessToken = jwt.sign(
        { 'username': foundUser.username },
        process.env.ACCESS_TOKEN_SECRET || '',
        { expiresIn: '30s' }
    );

    const refreshToken = jwt.sign(
        { 'username': foundUser.username },
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

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.json({ accessToken });
}

export const signOut = async (req: Request, res: Response) => {
    const { cookies } = req;

    if (!cookies?.jwt)
        return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const foundUser = data.users.find(u => u.refreshToken === refreshToken);

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204);
    }

    data.setUsers(
        data.users.map(u => {
            if (u.id === foundUser.id)
                return { ...u, refreshToken: '' };
            return u;
        })
    );

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
}

export const handleRefreshToken = (req: Request, res: Response) => {
    const { cookies } = req;

    if (!cookies?.jwt)
        return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    console.log('handleRefreshToken-refreshToken', refreshToken);

    const foundUser = data.users.find(u => u.refreshToken === refreshToken);

    if (!foundUser)
        return res.sendStatus(403);

    const user = jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET || '');

    console.log('handleRefreshToken-user', user)

    if (!user)
        return res.sendStatus(403);

    const accessToken = jwt.sign(
        { 'username': foundUser.username },
        process.env.ACCESS_TOKEN_SECRET || '',
        { expiresIn: '30s' }
    );

    res.json({ accessToken });
}
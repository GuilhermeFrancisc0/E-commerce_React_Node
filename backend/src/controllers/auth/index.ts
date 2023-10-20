import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { data } from '../user';

export const auth = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ 'message': 'Campos "Usuário" e "Senha" são obrigatórios!' });

    const foundUser = data.users.find(u => u.username === username);
    const passwordMatch = await bcrypt.compare(password, foundUser?.password || '');

    if (!foundUser || !passwordMatch)
        return res.status(401).json({ 'message': '"Usuário" ou "Senha" incorretos!' });

    res.json({ 'message': `Usuário ${username} logado!` });
}
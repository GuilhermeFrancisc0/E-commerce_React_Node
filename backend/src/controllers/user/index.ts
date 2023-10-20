import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { User } from '../../models/user';

const SALT_ROUNDS = 10;

export const data = {
    users: [] as User[],
    setUsers: function (data: User[]) { this.users = data }
}

export const getAll = (_: Request, res: Response) => {
    res.json(data.users);
}

export const create = async (req: Request, res: Response) => {
    const { email, username, password }: User = req.body;

    if (!email || !username || !password)
        return res.status(400).json({ 'message': 'Campos "Email", "Usuário" e "Senha" são obrigatórios!' });

    if (data.users.find(u => u.email === email))
        return res.status(400).json({ 'message': 'Email já Cadastrado no Sistema!' });

    if (data.users.find(u => u.username === username))
        return res.status(400).json({ 'message': 'Usuário já Cadastrado no Sistema!' });

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const encryptPassword = await bcrypt.hash(password, salt);

    const newUser: User = {
        id: data.users[data.users.length - 1]?.id + 1 || 1,
        email,
        username,
        password: encryptPassword,
        permissions: ['CLIENT'],
    };

    data.setUsers([...data.users, newUser]);

    res.json(newUser);
}

export const get = (req: Request, res: Response) => {
    const { id } = req.params;

    const user = data.users.find(u => u.id === Number(id));

    if (!user)
        return res.status(400).send({ 'message': 'Nenhum usuário encontrado!' });

    res.json(user);
}

export const remove = (req: Request, res: Response) => {
    const { id } = req.params;

    const userIdx = data.users.findIndex(u => u.id === Number(id));

    if (userIdx === -1)
        return res.status(400).send({ 'message': 'Nenhum usuário encontrado!' });

    data.users.splice(userIdx, 1);

    res.json(data.users);
}

export const update = (req: Request, res: Response) => {
    const { id } = req.params;
    const body: User = req.body;

    const userIdx = data.users.findIndex(u => u.id === Number(id));

    if (userIdx === -1)
        return res.status(400).send({ 'message': 'Nenhum usuário encontrado!' });

    if (!body.email || !body.username || !body.password)
        return res.status(400).json({ 'message': 'Campos "Email", "Usuário" e "Senha" são obrigatórios!' });

    if (data.users.find(u => u.email === body.email))
        return res.status(400).json({ 'message': 'Email já Cadastrado no Sistema!' });

    if (data.users.find(u => u.username === body.username))
        return res.status(400).json({ 'message': 'Usuário já Cadastrado no Sistema!' });

    data.setUsers(
        data.users.map(u => {
            if (u.id === Number(id))
                return { ...u, ...body };
            return u;
        })
    );

    res.json(data.users);
}

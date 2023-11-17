import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User, UserModel } from '../../models/user';

const SALT_ROUNDS = 10;

export const getAll = async (_: Request, res: Response) => {
    const users = await UserModel.find();

    res.json(users);
}

export const create = async (req: Request, res: Response) => {
    const { email, username, password }: User = req.body;

    if (!email || !username || !password)
        return res.status(400).json({ 'message': 'Campos "Email", "Usuário" e "Senha" são obrigatórios!' });

    if (await UserModel.findOne({ email }))
        return res.status(400).json({ 'message': 'Email já Cadastrado no Sistema!' });

    if (await UserModel.findOne({ username }))
        return res.status(400).json({ 'message': 'Usuário já Cadastrado no Sistema!' });

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const encryptPassword = await bcrypt.hash(password, salt);

    const newUser: User = {
        email,
        username,
        password: encryptPassword,
        permissions: ['CLIENT'],
        refreshToken: ''
    };

    await UserModel.create(newUser);

    res.sendStatus(201);
}

export const get = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user)
        return res.status(400).send({ 'message': 'Nenhum usuário encontrado!' });

    res.json(user);
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user)
        return res.status(400).send({ 'message': 'Nenhum usuário encontrado!' });

    const users = await UserModel.findByIdAndDelete(id);

    res.json(users);
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body: User = req.body;

    const user = await UserModel.findById(id);

    if (!user)
        return res.status(400).send({ 'message': 'Nenhum usuário encontrado!' });

    if (!body.email || !body.username || !body.password)
        return res.status(400).json({ 'message': 'Campos "Email", "Usuário" e "Senha" são obrigatórios!' });

    if (await UserModel.findOne({ email: body.email }))
        return res.status(400).json({ 'message': 'Email já Cadastrado no Sistema!' });

    if (await UserModel.findOne({ username: body.username }))
        return res.status(400).json({ 'message': 'Usuário já Cadastrado no Sistema!' });

    const editedUser = await UserModel.findByIdAndUpdate(user._id, { ...body });

    res.json(editedUser);
}

export const me = (req: Request, res: Response) => {
    const { cookies } = req;

    try {
        if (!cookies?.jwt)
            throw new Error('Cookie JWT não Encontrado!');

        const refreshToken = cookies.jwt;

        const user = jwt.decode(refreshToken) as Omit<User, 'password' | 'refreshToken'>;

        res.json(user);
    } catch (e: any | Error) {
        res.status(403).send({ message: e.message });
    }
}
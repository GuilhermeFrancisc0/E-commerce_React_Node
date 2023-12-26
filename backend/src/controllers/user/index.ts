import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { DecodedToken, User, UserModel } from '../../models/user';

const SALT_ROUNDS = 10;

export const getAll = async (_: Request, res: Response) => {
    try {
        const users = await UserModel.find();

        res.json(users);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const { email, username, password }: User = req.body;

        if (!email || !username || !password)
            throw new Error('Campos "Email", "Usuário" e "Senha" são obrigatórios!');

        if (await UserModel.findOne({ email }))
            throw new Error('Email já Cadastrado no Sistema!');

        if (await UserModel.findOne({ username }))
            throw new Error('Usuário já Cadastrado no Sistema!');

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const encryptPassword = await bcrypt.hash(password, salt);

        const newUser: User = {
            email,
            username,
            password: encryptPassword,
            permissions: ['CLIENT'],
        };

        await UserModel.create(newUser);

        res.sendStatus(201);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findById(id);

        if (!user)
            throw new Error('Nenhum usuário encontrado!');

        res.json(user);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const removedUser = await UserModel.findByIdAndDelete(id);

        res.json(removedUser);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body: User = req.body;

        const user = await UserModel.findById(id);

        if (!user)
            throw new Error('Nenhum usuário encontrado!');

        if (!body.email || !body.username || !body.password)
            throw new Error('Campos "Email", "Usuário" e "Senha" são obrigatórios!');

        if (await UserModel.findOne({ email: body.email, _id: { $ne: user._id } }))
            throw new Error('Email já Cadastrado no Sistema!');

        if (await UserModel.findOne({ username: body.username, _id: { $ne: user._id } }))
            throw new Error('Usuário já Cadastrado no Sistema!');

        const editedUser = await UserModel.findByIdAndUpdate(user._id, { ...body });

        res.json(editedUser);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const me = (req: Request, res: Response) => {
    try {
        const { cookies } = req;

        if (!cookies?.jwt)
            throw new Error('Cookie JWT não Encontrado!');

        const refreshToken = cookies.jwt;

        const user = jwt.decode(refreshToken) as DecodedToken;

        res.json(user);
    } catch (e: any | Error) {
        res.status(403).send({ message: e.message });
    }
}
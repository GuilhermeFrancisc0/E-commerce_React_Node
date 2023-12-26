import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Product, ProductModel } from '../../models/product';
import { UserModel } from '../../models/user';

export const list = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 12, search = "" } = req.query;

        const count = await ProductModel.countDocuments();

        const list = await ProductModel
            .find(
            // $text
            // { name: { $regex: search, $options: "i" }, }
        )
            .sort({ _id: -1 })
            .limit(Number(limit))
            .skip((Number(page)) * Number(limit))
            .exec();

        res.json({
            products: list,
            total: count,
            limit: Number(limit),
            totalPages: Math.ceil(count / Number(limit)),
            page: Number(page),
        });

    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const { name, price, imgSrc }: Product = req.body;

        if (!name || !price || !imgSrc)
            throw new Error('Campos "Nome", "Preço" e "Imagem" são obrigatórios!');

        if (price <= 0)
            throw new Error('Preço Precisa ser maior que 0!');

        if (await ProductModel.findOne({ name }))
            throw new Error('Nome já Cadastrado no Sistema!');

        if (await ProductModel.findOne({ imgSrc }))
            throw new Error('Imagem já Cadastrada no Sistema!');

        const newProduct: Product = {
            name,
            price,
            imgSrc,
            rating: 0,
        };

        const createdProduct = await ProductModel.create(newProduct);

        res.json(createdProduct);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id);

        if (!product)
            throw new Error('Nenhum produto encontrado!');

        res.json(product);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const removedProduct = await ProductModel.findByIdAndDelete(id);

        res.json(removedProduct);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body: Product = req.body;

        const product = await ProductModel.findById(id);

        if (!product)
            throw new Error('Nenhum produto encontrado!');

        if (!body.name || !body.price || !body.imgSrc)
            throw new Error('Campos "Nome", "Preço" e "Imagem" são obrigatórios!');

        if (body.price <= 0)
            throw new Error('Preço Precisa ser maior que 0!');

        if (await ProductModel.findOne({ name: body.name, _id: { $ne: body.id } }))
            throw new Error('Nome já Cadastrado no Sistema!');

        if (await ProductModel.findOne({ imgSrc: body.imgSrc, _id: { $ne: body.id } }))
            throw new Error('Imagem já Cadastrada no Sistema!');

        const editedProduct = await ProductModel.findByIdAndUpdate(product._id, { ...body }, { new: true });

        res.json(editedProduct);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const getFavorites = async (req: Request, res: Response) => {
    try {
        const { cookies } = req;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        if (!foundUser)
            throw new Error('Usuário não Encontrado!');

        res.json(foundUser.favoriteProducts);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const favorite = async (req: Request, res: Response) => {
    try {
        const { params: { id }, cookies } = req;

        const productId = id as any as mongoose.Types.ObjectId;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        if (!foundUser)
            throw new Error('Usuário não Encontrado!');

        const isAlreadyFavorite = foundUser.favoriteProducts?.some((fProductId) => fProductId.equals(productId));

        const updatedUser = await UserModel.findByIdAndUpdate(
            cookies.loggedUserId,
            isAlreadyFavorite ?
                { $pull: { favoriteProducts: productId } } :
                { $addToSet: { favoriteProducts: productId } },
            { new: true }
        );

        res.json(updatedUser?.favoriteProducts);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}
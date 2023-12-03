import { Request, Response } from 'express';

import { Product, ProductModel } from '../../models/product';
import { UserModel } from '../../models/user';

export const list = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 12, search = "" } = req.query;

        const count = await ProductModel.countDocuments();

        const list = await ProductModel
            .find(
                // { name: { $regex: search, $options: "i" }, }
            )
            .sort({ id: 1 })
            .limit((limit as number) * 1)
            .skip(((page as number) - 1) * (limit as number))
            .exec();

        res.json({
            data: list,
            total: count,
            limit,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page),
        });

    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const { name, price, imgSrc }: Product = req.body;

        if (!name || !price || !imgSrc)
            return res.status(400).json({ 'message': 'Campos "Nome", "Preço" e "Imagem" são obrigatórios!' });

        if (price <= 0)
            return res.status(400).json({ 'message': 'Preço Precisa ser maior que 0!' });

        if (await ProductModel.findOne({ name }))
            return res.status(400).json({ 'message': 'Nome já Cadastrado no Sistema!' });

        if (await ProductModel.findOne({ imgSrc }))
            return res.status(400).json({ 'message': 'Imagem já Cadastrada no Sistema!' });

        const newProduct: Product = {
            name,
            price,
            imgSrc,
            rating: 0,
        };

        await ProductModel.create(newProduct);

        res.sendStatus(201);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id);

        if (!product)
            return res.status(400).send({ 'message': 'Nenhum produto encontrado!' });

        res.json(product);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id);

        if (!product)
            return res.status(400).send({ 'message': 'Nenhum produto encontrado!' });

        const products = await UserModel.findByIdAndDelete(id);

        res.json(products);
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
            return res.status(400).send({ 'message': 'Nenhum produto encontrado!' });

        if (!body.name || !body.price || !body.imgSrc)
            return res.status(400).json({ 'message': 'Campos "Nome", "Preço" e "Imagem" são obrigatórios!' });

        if (body.price <= 0)
            return res.status(400).json({ 'message': 'Preço Precisa ser maior que 0!' });

        if (await ProductModel.findOne({ name: body.name }))
            return res.status(400).json({ 'message': 'Nome já Cadastrado no Sistema!' });

        if (await ProductModel.findOne({ imgSrc: body.imgSrc }))
            return res.status(400).json({ 'message': 'Imagem já Cadastrada no Sistema!' });

        const editedProduct = await UserModel.findByIdAndUpdate(product._id, { ...body });

        res.json(editedProduct);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

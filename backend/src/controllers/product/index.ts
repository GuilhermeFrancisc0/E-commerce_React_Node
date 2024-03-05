import { Request, Response } from 'express';
import mongoose, { FilterQuery } from 'mongoose';

import {
    Evaluation, EvaluationPayload, Product, ProductListFilters, ProductListReponse, ProductModel
} from '../../models/product';
import { UserModel } from '../../models/user';

export const list = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 12, search, price, rating, favorite } = req.query;

        const { cookies } = req;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        const filters = { price, rating, favorite } as ProductListFilters;

        const query: FilterQuery<ProductListFilters> = {};

        if (filters.price)
            query.price = { $gte: filters.price.min, $lte: filters.price.max };

        if (filters.rating)
            query.rating = { $gte: filters.rating };

        if (filters.favorite && favorite === 'true')
            query._id = { $in: foundUser?.favoriteProducts };

        // if (search)
        //  filter.$text = { $search: search };

        const count = await ProductModel.countDocuments(query);

        const list = await ProductModel
            .find(query)
            .sort({ _id: -1 })
            .limit(Number(limit))
            .skip((Number(page)) * Number(limit))

        const response: ProductListReponse = {
            products: list,
            total: count,
            limit: Number(limit),
            totalPages: Math.ceil(count / Number(limit)),
            page: Number(page)
        };

        if (filters.price) {
            response.price = {
                min: Number(filters.price.min),
                max: Number(filters.price.max),
            };
        }

        if (filters.rating)
            response.rating = Number(filters.rating);

        if (filters.favorite && favorite === 'true')
            response.favorite = true;

        // if (search)
        //     response.search = search;

        res.json(response);
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

// Favorite

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

export const getOptions = async (_: Request, res: Response) => {
    try {
        const [{ _id, ...price }] = await ProductModel.aggregate([
            {
                $group: {
                    _id: null,
                    min: { $min: '$price' },
                    max: { $max: '$price' },
                }
            }
        ]);

        res.json({ price });
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

// Cart

export const getCart = async (req: Request, res: Response) => {
    try {
        const { cookies } = req;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        if (!foundUser)
            throw new Error('Usuário não Encontrado!');

        const list = await ProductModel.find({ _id: { $in: foundUser?.cartProducts } });

        const cart = foundUser?.cartProducts?.map(cartProdId => list.find(l => cartProdId.equals(l.id)));

        res.json(cart);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const addCart = async (req: Request, res: Response) => {
    try {
        const { params: { id }, cookies } = req;

        const productId = id as any as mongoose.Types.ObjectId;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const updatedUser = await UserModel.findByIdAndUpdate(
            cookies.loggedUserId,
            { $push: { cartProducts: productId } },
            { new: true }
        );

        const list = await ProductModel.find({ _id: { $in: updatedUser?.cartProducts } });

        const cart = updatedUser?.cartProducts?.map(cartProdId => list.find(l => cartProdId.equals(l.id)));

        res.json(cart);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const removeCart = async (req: Request, res: Response) => {
    try {
        const { params: { idx }, cookies } = req;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const updatedUser = await UserModel.findByIdAndUpdate(
            cookies.loggedUserId,
            [
                {
                    $set: {
                        cartProducts: {
                            $concatArrays: [
                                { $slice: ["$cartProducts", Number(idx)] },
                                { $slice: ["$cartProducts", { $add: [1, Number(idx)] }, { $size: "$cartProducts" }] }
                            ]
                        }
                    }
                }
            ],
            { new: true }
        );

        const list = await ProductModel.find({ _id: { $in: updatedUser?.cartProducts } });

        const cart = updatedUser?.cartProducts?.map(cartProdId => list.find(l => cartProdId.equals(l.id)));

        res.json(cart);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const finalizeCart = async (req: Request, res: Response) => {
    try {
        const { cookies } = req;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        if (!foundUser?.cartProducts)
            throw new Error('Carrinho vazio!');

        const cartProducts = foundUser?.cartProducts.map(pId => {
            return { id: pId, purchaseDate: Date.now() }
        });

        const purchasesHistory = [...cartProducts, ...(foundUser?.purchasesHistory || [])];

        const updatedUser = await UserModel.findByIdAndUpdate(
            cookies.loggedUserId,
            {
                cartProducts: [],
                purchasesHistory
            },
            { new: true }
        );

        res.json(updatedUser?.cartProducts);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const getPurchasesHistory = async (req: Request, res: Response) => {
    try {
        const { cookies } = req;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        if (!foundUser)
            throw new Error('Usuário não Encontrado!');

        const list = await ProductModel.find({ _id: { $in: foundUser?.purchasesHistory?.map(p => p.id) } });

        const purchasesHistory = foundUser?.purchasesHistory?.map(p => {
            const product = list.find(l => p.id.equals(l.id))?.toObject();

            return {
                ...product,
                purchaseDate: p.purchaseDate
            }
        });

        res.json(purchasesHistory);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}

export const evaluateProduct = async (req: Request, res: Response) => {
    try {
        const { params: { id }, cookies, body } = req;

        const productId = id as any as mongoose.Types.ObjectId;

        const evaluationBody = body as EvaluationPayload;

        if (!cookies.loggedUserId)
            throw new Error('Cookie loggedUserId não Encontrado!');

        const foundUser = await UserModel.findById(cookies.loggedUserId);

        if (!foundUser)
            throw new Error('Usuário não Encontrado!');

        if(!foundUser.purchasesHistory?.some(ph => ph.id.equals(productId)))
            throw new Error('Só podem ser avaliados produtos já comprados!');

        if (!Number.isInteger(evaluationBody.rating))
            throw new Error('Avaliação sem nota!');

        const evaluation: Evaluation = {
            ...evaluationBody,
            createdAt: new Date(),
            userId: foundUser.id,
            username: foundUser.username,
        }

        const product = await ProductModel.findByIdAndUpdate(
            productId,
            { $push: { evaluations: evaluation } },
            { new: true }
        );

        res.json(product?.evaluations);
    } catch (e: any | Error) {
        res.status(400).send({ message: e.message });
    }
}
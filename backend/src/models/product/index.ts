import mongoose from 'mongoose';

export type Product = {
    id?: string;
    name: string;
    imgSrc: string;
    rating?: number;
    price: number;
    favorite?: boolean;
}

const ProductSchema = new mongoose.Schema<Product>(
    {
        name: {
            type: String,
            required: true
        },
        imgSrc: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 0,
            max: 0,
        },
        price: {
            type: Number,
            min: 0,
        },
        favorite: {
            type: Boolean,
        }
    },
);

export const ProductModel = mongoose.model("products", ProductSchema);
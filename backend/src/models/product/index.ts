import mongoose from 'mongoose';

export type Product = {
    id?: string;
    name: string;
    imgSrc: string;
    rating: number;
    price: number;
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
            max: 5,
        },
        price: {
            type: Number,
            min: 0,
        },
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
    }
);

export const ProductModel = mongoose.model("products", ProductSchema);
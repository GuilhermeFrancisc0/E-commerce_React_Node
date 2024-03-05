import mongoose from 'mongoose';

export type EvaluationPayload = {
    rating: number;
    comment: string;
}

export type Evaluation = {
    userId: mongoose.Types.ObjectId;
    username: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

export type Product = {
    id?: string;
    name: string;
    imgSrc: string;
    rating: number;
    price: number;
    evaluations?: Evaluation;
}

export type ProductListReponse = {
    products: Product[];
    total: number;
    limit: number;
    totalPages: number;
    page: number;
} & ProductListFilters;

export type ProductListFilters = {
    price?: {
        min: number;
        max: number;
    };
    rating?: number,
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
            max: 5,
        },
        price: {
            type: Number,
            min: 0,
        },
        evaluations: [{
            userId: mongoose.Types.ObjectId,
            username: String,
            rating: Number,
            comment: String,
            createdAt: Date,
        }],
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

// Search
// ProductSchema.index({ name: 'text' });

export const ProductModel = mongoose.model("products", ProductSchema);
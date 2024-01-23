import mongoose from 'mongoose';

import { Permissions } from '../../enum/permissions';

export type User = {
    email: string;
    username: string;
    password: string;
    permissions: (keyof typeof Permissions)[];
    favoriteProducts?: mongoose.Types.ObjectId[];
    cartProducts?: mongoose.Types.ObjectId[];
    purchasesHistory?: { id: mongoose.Types.ObjectId, purchaseDate: Date }[];
}

export type DecodedToken = {
    email: string;
    username: string;
    permissions: (keyof typeof Permissions)[];
}

const UserSchema = new mongoose.Schema<User>(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        permissions: [{
            type: String,
            enum: Permissions,
            required: true
        }],
        favoriteProducts: [mongoose.Types.ObjectId],
        cartProducts: [mongoose.Types.ObjectId],
        purchasesHistory: [{
            id: mongoose.Types.ObjectId,
            purchaseDate: Date,
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

export const UserModel = mongoose.model("users", UserSchema);
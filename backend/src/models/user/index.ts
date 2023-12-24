import mongoose from 'mongoose';

import { Permissions } from '../../enum/permissions';

export type User = {
    email: string;
    username: string;
    password: string;
    permissions: (keyof typeof Permissions)[];
    refreshToken?: string;
    favoriteProducts?: mongoose.Types.ObjectId[];
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
        refreshToken: String,
        favoriteProducts: [mongoose.Types.ObjectId],
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
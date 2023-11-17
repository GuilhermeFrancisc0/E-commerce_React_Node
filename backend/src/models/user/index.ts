import mongoose from 'mongoose';

import { Permissions } from '../../enum/permissions';

export type User = {
    email: string;
    username: string;
    password: string;
    permissions: (keyof typeof Permissions)[];
    refreshToken?: string;
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
    },
);

export const UserModel = mongoose.model("users", UserSchema);
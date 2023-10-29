import { Permissions } from "../../enum/permissions"; 

export type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    permissions: (keyof typeof Permissions)[];
    refreshToken?: string;
}
export type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    permissions: ('ADMIN' | 'CLIENT')[];
    refreshToken?: string;
}
import { State } from '../../types/state';

export type AuthState = {
    user: User;
    signIn: State;
    signUp: State;
    forgetPassword: State;
}

export type Permissions = ('ADMIN' | 'CLIENT')[];

export type User = {
    username: string;
    email: string;
    token: string;
    permissions: Permissions;
}

export type SignInFormValues = {
    username: string;
    password: string;
}

export type SignUpFormValues = {
    email: string;
    username: string;
    password: string;
}

export type ForgetPasswordFormValues = {
    email: string;
}
import { State } from '../../types/state';

export type AuthState = {
    userInfo: User & State;
    signIn: State;
    signUp: State;
    signOut: State;
    forgetPassword: State;
}

export type Permissions = ('ADMIN' | 'CLIENT')[];

export type User = {
    id: string | number;
    email: string;
    username: string;
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
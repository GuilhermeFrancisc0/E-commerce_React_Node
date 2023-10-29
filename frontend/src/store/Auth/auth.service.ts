import api from '../../services/api';
import { ForgetPasswordFormValues, SignInFormValues, SignUpFormValues } from './auth.type';

export const requestSignIn = (payload: SignInFormValues) =>
    api.post<{ accessToken: string }>('/signIn', payload);

export const requestSignUp = (payload: SignUpFormValues) =>
    api.post('/user', payload);

export const requestSignOut = () =>
    api.get('/signOut');

export const requestForgetPassword = (payload: ForgetPasswordFormValues) =>
    api.post('/forgetPassword', payload);
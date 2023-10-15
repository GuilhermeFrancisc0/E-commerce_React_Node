import api from '../../services/api';
import { ForgetPasswordFormValues, SignInFormValues, SignUpFormValues, User } from './auth.type';

export const requestSignIn = (payload: SignInFormValues) =>
    api.post<User>('/signIn', payload);

export const requestSignUp = (payload: SignUpFormValues) =>
    api.post<User>('/signUp', payload);

export const requestForgetPassword = (payload: ForgetPasswordFormValues) =>
    api.post('/forgetPassword', payload);
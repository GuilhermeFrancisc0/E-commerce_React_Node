import * as yup from 'yup';

import { ForgetPasswordFormValues } from '../../../pages/Auth/ForgetPassword';
import { SignInFormValues } from '../../../pages/Auth/SignIn';
import { SignUpFormValues } from '../../../pages/Auth/SignUp';

export const signInSchema: yup.ObjectSchema<SignInFormValues> = yup.object({
    username: yup.string().required('Campo Obrigatório!'),
    password: yup.string().required('Campo Obrigatório!'),
})

export const signUpSchema: yup.ObjectSchema<SignUpFormValues> = yup.object({
    email: yup.string().email('Formato de Email Inválido!').required('Campo Obrigatório!'),
    username: yup.string().required('Campo Obrigatório!'),
    password: yup.string().required('Campo Obrigatório!').min(8, 'Mínimo de 8 Caracteres!'),
})

export const forgetPasswordSchema: yup.ObjectSchema<ForgetPasswordFormValues> = yup.object({
    email: yup.string().email('Formato de Email Inválido!').required('Campo Obrigatório!'),
})
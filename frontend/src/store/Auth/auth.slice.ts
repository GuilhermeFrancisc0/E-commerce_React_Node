import { AxiosError } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, ForgetPasswordFormValues, SignInFormValues, User } from './auth.type';

const initialState: AuthState = {
    user: {
        email: '',
        username: '',
        token: '',
        permissions: [],
    },
    signIn: {
        loading: false,
    },
    signUp: {
        loading: false,
    },
    forgetPassword: {
        loading: false,
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInRequest({ signIn }, _: PayloadAction<SignInFormValues>) {
            signIn.loading = true;
            console.log('Slice-signInRequest');
        },
        signInSuccess(state, { payload }: PayloadAction<User>) {
            state.signIn.loading = false;
            state.user = payload;
            console.log('Slice-signInSuccess', payload);
        },
        signInFail({ signIn }, { payload }: PayloadAction<AxiosError>) {
            signIn.loading = false;
            console.log('Slice-signInFail', payload.message);
        },

        signUpRequest({ signUp }, _: PayloadAction<SignInFormValues>) {
            signUp.loading = true;
            console.log('Slice-signUpRequest');
        },
        signUpSuccess(state, { payload }: PayloadAction<User>) {
            state.signUp.loading = false;
            state.user = payload;
            console.log('Slice-signUpSuccess', payload);
        },
        signUpFail({ signUp }, { payload }: PayloadAction<AxiosError>) {
            signUp.loading = false;
            console.log('Slice-signUpFail', payload.message);
        },

        forgetPasswordRequest({ forgetPassword }, _: PayloadAction<ForgetPasswordFormValues>) {
            forgetPassword.loading = true;
            console.log('Slice-forgetPasswordRequest');
        },
        forgetPasswordSuccess({ forgetPassword }) {
            forgetPassword.loading = false;
            console.log('Slice-forgetPasswordSuccess');
        },
        forgetPasswordFail({ forgetPassword }, { payload }: PayloadAction<AxiosError>) {
            forgetPassword.loading = false;
            console.log('Slice-forgetPasswordFail', payload.message);
        },

        signOut(state) {
            state.user = initialState.user;
        }
    }
})

export const {
    signInRequest,
    signInSuccess,
    signInFail,
    signUpRequest,
    signUpSuccess,
    signUpFail,
    forgetPasswordRequest,
    forgetPasswordSuccess,
    forgetPasswordFail,
    signOut,
} = authSlice.actions;

export default authSlice.reducer;
import { toast } from 'react-toastify';

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
        },
        signInSuccess(state, { payload }: PayloadAction<User>) {
            state.signIn.loading = false;
            state.user = payload;
        },
        signInFail({ signIn }, { payload }: PayloadAction<string>) {
            signIn.loading = false;
            toast.error(payload);
        },

        signUpRequest({ signUp }, _: PayloadAction<SignInFormValues>) {
            signUp.loading = true;
        },
        signUpSuccess(state, { payload }: PayloadAction<User>) {
            state.signUp.loading = false;
            state.user = payload;
        },
        signUpFail({ signUp }, { payload }: PayloadAction<string>) {
            signUp.loading = false;
            toast.error(payload);
        },

        forgetPasswordRequest({ forgetPassword }, _: PayloadAction<ForgetPasswordFormValues>) {
            forgetPassword.loading = true;
        },
        forgetPasswordSuccess({ forgetPassword }) {
            forgetPassword.loading = false;
        },
        forgetPasswordFail({ forgetPassword }, { payload }: PayloadAction<string>) {
            forgetPassword.loading = false;
            toast.error(payload);
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
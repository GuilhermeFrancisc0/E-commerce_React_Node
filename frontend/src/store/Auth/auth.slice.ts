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
        success: false,
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
        signInFail({ signIn }) {
            signIn.loading = false;
        },

        signUpRequest({ signUp }, _: PayloadAction<SignInFormValues>) {
            signUp.loading = true;
            signUp.success = false;
        },
        signUpSuccess({ signUp }) {
            signUp.loading = false;
            signUp.success = true;
        },
        signUpFail({ signUp }) {
            signUp.loading = false;
            signUp.success = false;
        },

        forgetPasswordRequest({ forgetPassword }, _: PayloadAction<ForgetPasswordFormValues>) {
            forgetPassword.loading = true;
        },
        forgetPasswordSuccess({ forgetPassword }) {
            forgetPassword.loading = false;
        },
        forgetPasswordFail({ forgetPassword }) {
            forgetPassword.loading = false;
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
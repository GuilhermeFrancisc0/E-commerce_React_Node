import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, ForgetPasswordFormValues, SignInFormValues } from './auth.type';

const initialState: AuthState = {
    accessToken: '',
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
        signInSuccess({ signIn }) {
            signIn.loading = false;
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

        signOut() {
            // TODO: Ajustar rota de signOut
        },

        updateAccessToken(state, { payload }: PayloadAction<string>) {
            state.accessToken = payload;
            localStorage.setItem('accessToken', payload);
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
    updateAccessToken,
} = authSlice.actions;

export default authSlice.reducer;
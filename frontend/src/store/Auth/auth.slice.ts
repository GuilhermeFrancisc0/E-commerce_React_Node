import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, ForgetPasswordFormValues, SignInFormValues, User } from './auth.type';

const initialState: AuthState = {
    userInfo: {
        id: '',
        email: '',
        username: '',
        permissions: [],
        loading: false,
    },
    signIn: {
        loading: false,
    },
    signUp: {
        loading: false,
        success: false,
    },
    signOut: {
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

        signOutRequest({ signOut }) {
            signOut.loading = true;
        },
        signOutSuccess(state) {
            state.signOut.loading = false;
            state.userInfo = initialState.userInfo;
            localStorage.removeItem('accessToken');
        },
        signOutFail({ signOut }) {
            signOut.loading = false;
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

        userInfoRequest({ userInfo }) {
            userInfo.loading = true;
        },
        userInfoSuccess(state, { payload }: PayloadAction<User>) {
            state.userInfo = { ...payload, loading: false };
        },
        userInfoFail({ userInfo }) {
            userInfo.loading = false;
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
    signOutRequest,
    signOutSuccess,
    signOutFail,
    forgetPasswordRequest,
    forgetPasswordSuccess,
    forgetPasswordFail,
    userInfoRequest,
    userInfoSuccess,
    userInfoFail,
} = authSlice.actions;

export default authSlice.reducer;
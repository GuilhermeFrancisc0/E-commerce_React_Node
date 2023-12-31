import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import {
    requestForgetPassword, requestSignIn, requestSignOut, requestSignUp, requestUserInfo
} from './auth.service';
import {
    forgetPasswordFail, forgetPasswordRequest, forgetPasswordSuccess, signInFail, signInRequest,
    signInSuccess, signOutRequest, signOutSuccess, signUpFail, signUpRequest, signUpSuccess,
    userInfoFail, userInfoRequest, userInfoSuccess
} from './auth.slice';
import { ForgetPasswordFormValues, SignInFormValues, SignUpFormValues, User } from './auth.type';

function* signIn({ payload }: PayloadAction<SignInFormValues>) {
    try {
        const { data: { accessToken } }: AxiosResponse<{ accessToken: string }> = yield call(requestSignIn, payload);

        localStorage.setItem('accessToken', accessToken);

        yield put(userInfoRequest());

        yield put(signInSuccess());
    } catch (e) {
        yield put(signInFail());
    }
}

function* signUp({ payload }: PayloadAction<SignUpFormValues>) {
    try {
        yield call(requestSignUp, payload);

        yield put(signUpSuccess());
    } catch (e) {
        yield put(signUpFail());
    }
}

function* signOut() {
    try {
        yield call(requestSignOut);

        yield put(signOutSuccess());
    } catch (e) {
        yield put(signUpFail());
    }
}

function* forgetPassword({ payload }: PayloadAction<ForgetPasswordFormValues>) {
    try {
        yield call(requestForgetPassword, payload);

        yield put(forgetPasswordSuccess());
    } catch (e) {
        yield put(forgetPasswordFail());
    }
}

function* userInfo() {
    try {
        const { data }: AxiosResponse<User> = yield call(requestUserInfo);

        yield put(userInfoSuccess(data));
    } catch (e) {
        yield put(userInfoFail());
    }
}

export default all([
    takeLatest(signInRequest.type, signIn),
    takeLatest(signUpRequest.type, signUp),
    takeLatest(signOutRequest.type, signOut),
    takeLatest(forgetPasswordRequest.type, forgetPassword),
    takeLatest(userInfoRequest.type, userInfo),
]);
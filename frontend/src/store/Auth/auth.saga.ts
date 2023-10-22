import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestForgetPassword, requestSignIn, requestSignUp } from './auth.service';
import {
    forgetPasswordFail, forgetPasswordRequest, forgetPasswordSuccess, signInFail, signInRequest,
    signInSuccess, signUpFail, signUpRequest, signUpSuccess
} from './auth.slice';
import { ForgetPasswordFormValues, SignInFormValues, SignUpFormValues, User } from './auth.type';

function* signIn({ payload }: PayloadAction<SignInFormValues>) {
    try {
        const { data }: AxiosResponse<User> = yield call(requestSignIn, payload);

        yield put(signInSuccess(data));
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

function* forgetPassword({ payload }: PayloadAction<ForgetPasswordFormValues>) {
    try {
        yield call(requestForgetPassword, payload);

        yield put(forgetPasswordSuccess());
    } catch (e) {
        yield put(forgetPasswordFail());
    }
}

export default all([
    takeLatest(signInRequest.type, signIn),
    takeLatest(signUpRequest.type, signUp),
    takeLatest(forgetPasswordRequest.type, forgetPassword),
]);
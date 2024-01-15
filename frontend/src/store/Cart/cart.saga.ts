import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../Products/products.type';
import { requestAdd, requestFinalize, requestList, requestRemove } from './cart.service';
import {
    addFail, addRequest, addSuccess, finalizeFail, finalizeRequest, finalizeSuccess, listFail,
    listRequest, listSuccess, removeFail, removeRequest, removeSuccess
} from './cart.slice';

function* list() {
    try {
        const { data }: AxiosResponse<Product[]> = yield call(requestList);

        yield put(listSuccess(data));
    } catch (e) {
        yield put(listFail());
    }
}

function* add({ payload }: PayloadAction<string>) {
    try {
        const { data }: AxiosResponse<Product[]> = yield call(requestAdd, payload);

        yield put(addSuccess(data));
    } catch (e) {
        yield put(addFail());
    }
}

function* remove({ payload }: PayloadAction<number>) {
    try {
        const { data }: AxiosResponse<Product[]> = yield call(requestRemove, payload);

        yield put(removeSuccess(data));
    } catch (e) {
        yield put(removeFail());
    }
}

function* finalize() {
    try {
        yield call(requestFinalize);

        yield put(finalizeSuccess());
    } catch (e) {
        yield put(finalizeFail());
    }
}

export default all([
    takeLatest(listRequest.type, list),
    takeLatest(addRequest.type, add),
    takeLatest(removeRequest.type, remove),
    takeLatest(finalizeRequest.type, finalize),
]);
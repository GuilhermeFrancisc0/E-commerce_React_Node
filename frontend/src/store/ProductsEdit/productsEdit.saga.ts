import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestCreate, requestEdit, requestList, requestRemove } from './productsEdit.service';
import {
    createFail, createRequest, createSuccess, editFail, editRequest, editSuccess, listFail,
    listRequest, listSuccess, removeFail, removeRequest, removeSuccess
} from './productsEdit.slice';
import { Product, ProductFormValues, ProductListParams, ProductListResponse } from './productsEdit.type';

function* list({ payload: params }: PayloadAction<ProductListParams>) {
    try {
        const { data }: AxiosResponse<ProductListResponse> = yield call(requestList, params);

        yield put(listSuccess(data));
    } catch (e) {
        yield put(listFail());
    }
}

function* create({ payload }: PayloadAction<ProductFormValues>) {
    try {
        const { data }: AxiosResponse<Product> = yield call(requestCreate, payload);

        yield put(createSuccess(data));
    } catch (e) {
        yield put(createFail());
    }
}

function* edit({ payload }: PayloadAction<ProductFormValues>) {
    try {
        const { data }: AxiosResponse<Product> = yield call(requestEdit, payload);

        yield put(editSuccess(data));
    } catch (e) {
        yield put(editFail());
    }
}

function* remove({ payload }: PayloadAction<string>) {
    try {
        yield call(requestRemove, payload);

        yield put(removeSuccess(payload));
    } catch (e) {
        yield put(removeFail());
    }
}

export default all([
    takeLatest(listRequest.type, list),
    takeLatest(createRequest.type, create),
    takeLatest(editRequest.type, edit),
    takeLatest(removeRequest.type, remove),
]);
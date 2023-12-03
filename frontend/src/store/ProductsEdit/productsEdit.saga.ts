import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestCreate, requestEdit, requestList, requestRemove } from './productsEdit.service';
import {
    createFail, createRequest, createSuccess, editFail, editRequest, editSuccess, listFail,
    listRequest, listSuccess, removeFail, removeRequest, removeSuccess
} from './productsEdit.slice';
import { Product, ProductFormValues } from './productsEdit.type';

function* list({ payload: page }: PayloadAction<number>) {
    try {
        // const { data }: AxiosResponse<Product[]> = yield call(requestList, page);

        yield put(listSuccess([]));
    } catch (e) {
        yield put(listFail());
    }
}

function* create({ payload }: PayloadAction<ProductFormValues>) {
    try {
        // yield call(requestCreate, payload);

        yield put(createSuccess(payload));
    } catch (e) {
        yield put(createFail());
    }
}

function* edit({ payload }: PayloadAction<ProductFormValues>) {
    try {
        // yield call(requestEdit, payload);

        yield put(editSuccess(payload));
    } catch (e) {
        yield put(editFail());
    }
}

function* remove({ payload }: PayloadAction<string>) {
    try {
        // yield call(requestRemove, payload);

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
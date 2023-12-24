import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestFavorites, requestList, requestToggleFavorite } from './products.service';
import {
    favoriteFail, favoriteRequest, favoriteSuccess, listFail, listRequest, listSuccess
} from './products.slice';
import { ProductListParams, ProductListResponse } from './products.type';

function* list({ payload: params }: PayloadAction<ProductListParams>) {
    try {
        const [
            { data: favoriteList },
            { data: list }
        ]: [AxiosResponse<string[]>, AxiosResponse<ProductListResponse>]
            = yield all([
                call(requestFavorites),
                call(requestList, params),
            ])

        list.products = list.products.map(p => {
            return { ...p, favorite: !!(favoriteList.includes(p.id || '')) }
        });

        yield put(listSuccess(list));
    } catch (e) {
        yield put(listFail());
    }
}

function* favorite({ payload }: PayloadAction<string>) {
    try {
        const { data }: AxiosResponse<string[]> = yield call(requestToggleFavorite, payload);

        yield put(favoriteSuccess(data));
    } catch (e) {
        yield put(favoriteFail());
    }
}

export default all([
    takeLatest(listRequest.type, list),
    takeLatest(favoriteRequest.type, favorite),
]);
import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import {
    requestFavorites, requestList, requestOptions, requestSendEvaluation, requestToggleFavorite
} from './products.service';
import {
    favoriteFail, favoriteRequest, favoriteSuccess, filtersOptionsFail, filtersOptionsRequest,
    filtersOptionsSuccess, listFail, listRequest, listSuccess, sendEvaluationFail,
    sendEvaluationRequest, sendEvaluationSuccess
} from './products.slice';
import {
    ProductEvaluation, ProductEvaluationPayload, ProductFiltersOptions, ProductListParams,
    ProductListResponse
} from './products.type';

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

function* filtersOptions() {
    try {
        const { data }: AxiosResponse<ProductFiltersOptions> = yield call(requestOptions);

        yield put(filtersOptionsSuccess(data));
    } catch (e) {
        yield put(filtersOptionsFail());
    }
}

function* sendEvaluation({ payload }: PayloadAction<ProductEvaluationPayload>) {
    try {
        const { data }: AxiosResponse<ProductEvaluation[]> = yield call(requestSendEvaluation, payload);

        yield put(sendEvaluationSuccess(data));
    } catch (e) {
        yield put(sendEvaluationFail());
    }
}

export default all([
    takeLatest(listRequest.type, list),
    takeLatest(favoriteRequest.type, favorite),
    takeLatest(filtersOptionsRequest.type, filtersOptions),
    takeLatest(sendEvaluationRequest.type, sendEvaluation),
]);
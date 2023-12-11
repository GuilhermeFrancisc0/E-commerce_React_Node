import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestList } from './products.service';
import { listFail, listRequest, listSuccess } from './products.slice';
import { ProductListParams, ProductListResponse } from './products.type';

function* list({ payload: params }: PayloadAction<ProductListParams>) {
    try {
        const { data }: AxiosResponse<ProductListResponse> = yield call(requestList, params);

        yield put(listSuccess(data));
    } catch (e) {
        yield put(listFail());
    }
}

export default all([
    takeLatest(listRequest.type, list),
]);
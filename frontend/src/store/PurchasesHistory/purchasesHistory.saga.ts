import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { requestList } from './purchasesHistory.service';
import { listFail, listRequest, listSuccess } from './purchasesHistory.slice';
import { HistoryProduct } from './purchasesHistory.type';

function* list() {
    try {
        const { data }: AxiosResponse<HistoryProduct[]> = yield call(requestList);

        yield put(listSuccess(data));
    } catch (e) {
        yield put(listFail());
    }
}

export default all([
    takeLatest(listRequest.type, list),
]);
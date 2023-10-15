import { all } from 'redux-saga/effects';

import authSaga from './Auth/auth.saga';

export default function* rootSaga() {
    yield all([
        authSaga
    ])
}
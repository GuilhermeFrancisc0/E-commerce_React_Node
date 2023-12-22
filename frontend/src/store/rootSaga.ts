import { all } from 'redux-saga/effects';

import authSaga from './Auth/auth.saga';
import productsSaga from './Products/products.saga';
import productsEditSaga from './ProductsEdit/productsEdit.saga';

export default function* rootSaga() {
    yield all([
        authSaga,
        productsSaga,
        productsEditSaga,
    ])
}
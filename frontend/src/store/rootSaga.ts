import { all } from 'redux-saga/effects';

import authSaga from './Auth/auth.saga';
import cartSaga from './Cart/cart.saga';
import productsSaga from './Products/products.saga';
import productsEditSaga from './ProductsEdit/productsEdit.saga';
import purchasesHistorySaga from './PurchasesHistory/purchasesHistory.saga';

export default function* rootSaga() {
    yield all([
        authSaga,
        productsSaga,
        productsEditSaga,
        cartSaga,
        purchasesHistorySaga,
    ])
}
import createSagaMiddleware from 'redux-saga';

import { configureStore } from '@reduxjs/toolkit';

import authSlice from './Auth/auth.slice';
import productsSlice from './Products/products.slice';
import productsEditSlice from './ProductsEdit/productsEdit.slice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productsSlice,
        productsEdit: productsEditSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: false
        }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
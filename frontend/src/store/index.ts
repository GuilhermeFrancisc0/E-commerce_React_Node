import createSagaMiddleware from 'redux-saga';

import { configureStore } from '@reduxjs/toolkit';

import authSlice from './Auth/auth.slice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: false
        }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
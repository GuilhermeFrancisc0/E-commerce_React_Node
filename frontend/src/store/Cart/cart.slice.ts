import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../Products/products.type';
import { CartState } from './cart.type';

const initialState: CartState = {
    products: [],
    list: {
        loading: false,
    },
    add: {
        loadingId: null,
    },
    remove: {
        loading: false,
    },
    finalize: {
        loading: false,
    },
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        listRequest({ list }) {
            list.loading = true;
        },
        listSuccess(state, { payload }: PayloadAction<Product[]>) {
            state.list.loading = false;
            state.products = payload;
        },
        listFail({ list }) {
            list.loading = false;
        },

        addRequest({ add }, { payload }: PayloadAction<string>) {
            add.loadingId = payload;
        },
        addSuccess(state, { payload }: PayloadAction<Product[]>) {
            state.add.loadingId = null;
            state.products = payload;
        },
        addFail({ add }) {
            add.loadingId = null;
        },

        removeRequest({ remove }, _: PayloadAction<string>) {
            remove.loading = true;
        },
        removeSuccess(state, { payload }: PayloadAction<string>) {
            state.remove.loading = false;
            state.products = [...state.products.filter(p => p.id !== payload)];
        },
        removeFail({ remove }) {
            remove.loading = false;
        },

        finalizeRequest({ finalize }) {
            finalize.loading = true;
        },
        finalizeSuccess(state) {
            state.finalize.loading = false;
            state.products = [];
        },
        finalizeFail({ finalize }) {
            finalize.loading = false;
        },
    }
})

export const {
    listRequest,
    listSuccess,
    listFail,
    addRequest,
    addSuccess,
    addFail,
    removeRequest,
    removeSuccess,
    removeFail,
    finalizeRequest,
    finalizeSuccess,
    finalizeFail,
} = cartSlice.actions;

export default cartSlice.reducer;
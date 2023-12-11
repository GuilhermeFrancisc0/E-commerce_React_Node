import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductListParams, ProductListResponse } from '../Products/products.type';
import { ProductFormValues, ProductsEditState } from './productsEdit.type';

const initialState: ProductsEditState = {
    list: {
        loading: false,
        products: [],
        total: 0,
        limit: 0,
        totalPages: 0,
        page: 0,
    },
    create: {
        loading: false,
        success: false,
    },
    edit: {
        loading: false,
        success: false,
    },
    remove: {
        loading: false,
        success: false,
    },
}

const productsEditSlice = createSlice({
    name: 'productsEdit',
    initialState,
    reducers: {
        listRequest({ list }, { payload: { page } }: PayloadAction<ProductListParams>) {
            list.loading = true;
            list.products = page ? [...list.products] : [];
        },
        listSuccess({ list }, { payload }: PayloadAction<ProductListResponse>) {
            list.loading = false;
            list.products = [...list.products, ...payload.products];
            list.page = payload.page;
            list.limit = payload.limit;
            list.total = payload.total;
            list.totalPages = payload.totalPages;
        },
        listFail({ list }) {
            list.loading = false;
        },

        createRequest({ create }, _: PayloadAction<ProductFormValues>) {
            create.loading = true;
            create.success = false;
        },
        createSuccess(state, { payload }: PayloadAction<Product>) {
            state.create.loading = false;
            state.create.success = true;
            state.list.products = [...state.list.products, payload];
        },
        createFail({ create }) {
            create.loading = false;
            create.success = false;
        },

        editRequest({ edit }, _: PayloadAction<ProductFormValues>) {
            edit.loading = true;
            edit.success = false;
        },
        editSuccess(state, { payload }: PayloadAction<ProductFormValues>) {
            state.edit.loading = false;
            state.edit.success = true;
            state.list.products = [...state.list.products.map(p => p.id === payload.id ? payload : p)];
        },
        editFail({ edit }) {
            edit.loading = false;
            edit.success = false;
        },

        removeRequest({ remove }, _: PayloadAction<string>) {
            remove.loading = true;
            remove.success = false;
        },
        removeSuccess(state, { payload }: PayloadAction<string>) {
            state.remove.loading = false;
            state.remove.success = true;
            state.list.products = [...state.list.products.filter(p => p.id !== payload)];
        },
        removeFail({ remove }) {
            remove.loading = false;
            remove.success = false;
        },
    }
})

export const {
    listRequest,
    listSuccess,
    listFail,
    createRequest,
    createSuccess,
    createFail,
    editRequest,
    editSuccess,
    editFail,
    removeRequest,
    removeSuccess,
    removeFail,
} = productsEditSlice.actions;

export default productsEditSlice.reducer;
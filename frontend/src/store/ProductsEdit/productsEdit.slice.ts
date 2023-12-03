import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductFormValues, ProductsEditState } from './productsEdit.type';

const initialState: ProductsEditState = {
    products: [],
    list: {
        loading: false,
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
        listRequest(state, { payload: page }: PayloadAction<number>) {
            state.list.loading = true;
            state.products = page ? [...state.products] : [];
        },
        listSuccess(state, { payload }: PayloadAction<Product[]>) {
            state.list.loading = false;
            state.products = [...state.products, ...payload];
        },
        listFail({ list }) {
            list.loading = false;
        },

        createRequest({ create }, _: PayloadAction<ProductFormValues>) {
            create.loading = true;
            create.success = false;
        },
        createSuccess(state, { payload }: PayloadAction<ProductFormValues>) {
            state.create.loading = false;
            state.create.success = true;
            state.products = [...state.products, { ...payload, id: Date.now().toString() }];
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
            state.products = [...state.products.map(p => p.id === payload.id ? payload : p)];
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
            state.products = [...state.products.filter(p => p.id !== payload)];
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
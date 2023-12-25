import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductListParams, ProductListResponse } from '../Products/products.type';
import {
    ProductEditFiltersOptions, ProductFormValues, ProductsEditState
} from './productsEdit.type';

const initialState: ProductsEditState = {
    list: {
        loading: false,
        success: false,
        products: [],
        total: 0,
        limit: 0,
        totalPages: 0,
        page: 0,
    },
    filters: {
        options: {
            price: undefined,
            loading: false,
        },
        selecteds: {
            price: undefined,
            rating: undefined,
        },
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
            list.success = false;
            list.products = page ? [...list.products] : [];
        },
        listSuccess(state, { payload }: PayloadAction<ProductListResponse>) {
            const { price, rating, ...listPayload } = payload;

            state.list = {
                ...state.list,
                loading: false,
                success: true,
                ...listPayload,
                products: [...state.list.products, ...listPayload.products]
            }

            state.filters.selecteds = {
                ...state.filters.selecteds,
                price,
                rating
            }
        },
        listFail({ list }) {
            list.loading = false;
            list.success = false;
        },

        createRequest({ create }, _: PayloadAction<ProductFormValues>) {
            create.loading = true;
            create.success = false;
        },
        createSuccess(state) {
            state.create.loading = false;
            state.create.success = true;
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

        filtersOptionsRequest({ filters: { options } }) {
            options.loading = true;
        },
        filtersOptionsSuccess({ filters }, { payload }: PayloadAction<ProductEditFiltersOptions>) {
            filters.options = {
                ...filters.options,
                loading: false,
                ...payload
            }
        },
        filtersOptionsFail({ filters: { options } }) {
            options.loading = false;
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
    filtersOptionsRequest,
    filtersOptionsSuccess,
    filtersOptionsFail,
} = productsEditSlice.actions;

export default productsEditSlice.reducer;
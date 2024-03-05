import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    ProductEvaluation,
    ProductEvaluationPayload,
    ProductFiltersOptions, ProductListParams, ProductListResponse, ProductsState
} from './products.type';

const initialState: ProductsState = {
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
            favorite: undefined,
            price: undefined,
            rating: undefined,
        },
    },
    favorite: {
        loadingId: null,
    },
    sendEvaluation: {
        loading: false,
        success: false,
    }
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        listRequest({ list }, { payload: { page } }: PayloadAction<ProductListParams>) {
            list.loading = true;
            list.success = false;
            list.products = page ? [...list.products] : [];
        },
        listSuccess(state, { payload }: PayloadAction<ProductListResponse>) {
            const { favorite, price, rating, ...listPayload } = payload;

            state.list = {
                ...state.list,
                loading: false,
                success: true,
                ...listPayload,
                products: [...state.list.products, ...listPayload.products]
            }

            state.filters.selecteds = {
                ...state.filters.selecteds,
                favorite,
                price: price ? price : state.filters.options.price,
                rating
            }
        },
        listFail({ list }) {
            list.loading = false;
            list.success = false;
        },

        favoriteRequest({ favorite }, { payload }: PayloadAction<string>) {
            favorite.loadingId = payload;
        },
        favoriteSuccess({ favorite, list }, { payload }: PayloadAction<string[]>) {
            favorite.loadingId = null;

            list.products = list.products.map(p => {
                return { ...p, favorite: !!(payload.includes(p.id || '')) }
            })
        },
        favoriteFail({ favorite }) {
            favorite.loadingId = null;
        },

        filtersOptionsRequest({ filters: { options } }) {
            options.loading = true;
        },
        filtersOptionsSuccess({ filters }, { payload }: PayloadAction<ProductFiltersOptions>) {
            filters.options = {
                ...filters.options,
                loading: false,
                ...payload
            };
            filters.selecteds = { ...filters.selecteds, ...payload };
        },
        filtersOptionsFail({ filters: { options } }) {
            options.loading = false;
        },

        sendEvaluationRequest({ sendEvaluation }, _: PayloadAction<ProductEvaluationPayload>) {
            sendEvaluation.loading = true;
            sendEvaluation.success = false;
        },
        sendEvaluationSuccess({ sendEvaluation }, _: PayloadAction<ProductEvaluation[]>) {
            sendEvaluation.loading = false;
            sendEvaluation.success = true;
        },
        sendEvaluationFail({ sendEvaluation }) {
            sendEvaluation.loading = false;
            sendEvaluation.success = false;
        },
    }
})

export const {
    listRequest,
    listSuccess,
    listFail,
    favoriteRequest,
    favoriteSuccess,
    favoriteFail,
    filtersOptionsRequest,
    filtersOptionsSuccess,
    filtersOptionsFail,
    sendEvaluationRequest,
    sendEvaluationSuccess,
    sendEvaluationFail,
} = productsSlice.actions;

export default productsSlice.reducer;
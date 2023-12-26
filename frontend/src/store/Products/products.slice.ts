import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
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
} = productsSlice.actions;

export default productsSlice.reducer;
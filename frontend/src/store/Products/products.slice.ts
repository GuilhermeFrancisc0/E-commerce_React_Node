import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductListParams, ProductListResponse, ProductsState } from './products.type';

const initialState: ProductsState = {
    list: {
        loading: false,
        products: [],
        total: 0,
        limit: 0,
        totalPages: 0,
        page: 0,
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
        }
    }
})

export const {
    listRequest,
    listSuccess,
    listFail,
    favoriteRequest,
    favoriteSuccess,
    favoriteFail,
} = productsSlice.actions;

export default productsSlice.reducer;
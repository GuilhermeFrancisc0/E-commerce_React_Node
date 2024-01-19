import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HistoryProduct, PurchasesHistoryState } from './purchasesHistory.type';

const initialState: PurchasesHistoryState = {
    products: [],
    list: {
        loading: false,
    },
}

const purchasesHistorySlice = createSlice({
    name: 'purchasesHistory',
    initialState,
    reducers: {
        listRequest({ list }) {
            list.loading = true;
        },
        listSuccess(state, { payload }: PayloadAction<HistoryProduct[]>) {
            state.list.loading = false;
            state.products = payload;
        },
        listFail({ list }) {
            list.loading = false;
        },
    }
})

export const {
    listRequest,
    listSuccess,
    listFail,
} = purchasesHistorySlice.actions;

export default purchasesHistorySlice.reducer;
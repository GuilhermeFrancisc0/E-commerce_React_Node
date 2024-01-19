import { State } from '../../types/state';
import { Product } from '../Products/products.type';

export type PurchasesHistoryState = {
    products: HistoryProduct[];
    list: State;
}

export type HistoryProduct = Product & { purchaseDate: Date };
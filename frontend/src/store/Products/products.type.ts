import { State } from '../../types/state';

export type ProductsState = {
    list: ProductListResponse & State;
}

export type Product = {
    id?: string;
    name: string;
    imgSrc: string;
    rating?: number;
    price: number;
    favorite?: boolean;
}

export type ProductListParams = {
    page: number;
    limit: number;
}

export type ProductListResponse = {
    products: Product[];
    total: number;
    totalPages: number;
} & ProductListParams;
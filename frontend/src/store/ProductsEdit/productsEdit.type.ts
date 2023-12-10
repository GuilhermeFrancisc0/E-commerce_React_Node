import { State } from '../../types/state';

export type ProductsEditState = {
    list: ProductListResponse & State;
    create: State;
    edit: State;
    remove: State;
}

export type Product = {
    id?: string;
    name: string;
    imgSrc: string;
    rating?: number;
    price: number;
    favorite?: boolean;
}

export type ProductFormValues = {
    id?: string;
    name: string;
    imgSrc: string;
    price: number;
}

export type ProductListParams = {
    page: number;
    limit: number;
}

export type ProductListResponse = {
    products: Product[];
    total: number;
    limit: number;
    totalPages: number;
    page: number;
}
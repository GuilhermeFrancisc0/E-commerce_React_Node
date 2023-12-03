import { State } from '../../types/state';

export type ProductsEditState = {
    products: Product[];
    list: State;
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
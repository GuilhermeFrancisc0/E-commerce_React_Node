import { State } from '../../types/state';
import { ProductListResponse } from '../Products/products.type';

export type ProductsEditState = {
    list: ProductListResponse & State;
    create: State;
    edit: State;
    remove: State;
}

export type ProductFormValues = {
    id?: string;
    name: string;
    imgSrc: string;
    price: number;
}

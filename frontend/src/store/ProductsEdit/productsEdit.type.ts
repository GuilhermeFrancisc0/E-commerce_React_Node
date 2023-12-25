import { State } from '../../types/state';
import { ProductListResponse } from '../Products/products.type';

export type ProductsEditState = {
    list: ProductListResponse & State;
    filters: {
        options: ProductEditFiltersOptions & State;
        selecteds: ProductEditFiltersSelecteds;
    };
    create: State;
    edit: State;
    remove: State;
}

// Form

export type ProductFormValues = {
    id?: string;
    name: string;
    imgSrc: string;
    price: number;
}

// Filters

export type ProductEditFiltersSelecteds = {
    rating?: number;
} & ProductEditFiltersOptions;

export type ProductEditFiltersOptions = {
    price?: {
        min: number;
        max: number;
    }
}
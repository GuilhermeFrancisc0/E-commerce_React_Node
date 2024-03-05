import { State } from '../../types/state';

export type ProductsState = {
    list: ProductListResponse & State;
    filters: {
        options: ProductFiltersOptions & State;
        selecteds: ProductFiltersSelecteds;
    };
    favorite: {
        loadingId: string | null;
    };
    sendEvaluation: State;
}

export type Product = {
    id?: string;
    name: string;
    imgSrc: string;
    rating?: number;
    price: number;
    favorite?: boolean;
    evaluations?: ProductEvaluation[];
}

// List

export type ProductListParams = {
    page: number;
    limit: number;
} & ProductFiltersSelecteds;

export type ProductListResponse = {
    products: Product[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
} & ProductFiltersSelecteds;

// Filters

export type ProductFiltersSelecteds = {
    rating?: number;
    favorite?: boolean;
} & ProductFiltersOptions;

export type ProductFiltersOptions = {
    price?: {
        min: number;
        max: number;
    }
}

// Evaluation

export type ProductEvaluationPayload = {
    productId: string;
    rating: number | null;
    comment: string;
}

export type ProductEvaluation = {
    userId: string;
    username: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
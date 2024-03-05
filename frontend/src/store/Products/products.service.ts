import api from '../../services/api';
import {
    ProductEvaluation, ProductEvaluationPayload, ProductFiltersOptions, ProductListParams,
    ProductListResponse
} from './products.type';

export const requestList = (params: ProductListParams) =>
    api.get<ProductListResponse>('/products', { params });

export const requestOptions = () =>
    api.get<ProductFiltersOptions>('/products/options');

export const requestFavorites = () =>
    api.get<string[]>('/products/favorite');

export const requestToggleFavorite = (id: string) =>
    api.put<string[]>(`/products/${id}/favorite`);

export const requestSendEvaluation = ({ productId, ...payload }: ProductEvaluationPayload) =>
    api.post<ProductEvaluation[]>(`/products/evaluation/${productId}`, payload);
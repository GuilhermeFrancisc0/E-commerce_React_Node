import api from '../../services/api';
import { ProductListParams, ProductListResponse } from './products.type';

export const requestList = (params: ProductListParams) =>
    api.get<ProductListResponse>('/products', { params });

export const requestFavorites = () =>
    api.get<string[]>('/products/favorite');

export const requestToggleFavorite = (id: string) =>
    api.put<string[]>(`/products/${id}/favorite`);
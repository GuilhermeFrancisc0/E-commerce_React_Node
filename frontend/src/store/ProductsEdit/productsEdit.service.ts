import api from '../../services/api';
import { ProductFormValues, Product, ProductListParams } from './productsEdit.type';

export const requestList = (params: ProductListParams) =>
    api.get<Product[]>('/productsEdit', { params });

export const requestCreate = (payload: ProductFormValues) =>
    api.post('/productsEdit', payload);

export const requestEdit = (payload: ProductFormValues) =>
    api.put(`/productsEdit/${payload.id}`, payload);

export const requestRemove = (productId: string) =>
    api.delete(`/productsEdit/${productId}`);
import api from '../../services/api';
import { ProductFormValues, Product } from './productsEdit.type';

export const requestList = (page: number) =>
    api.get<Product[]>('/productsEdit', { params: { page } });

export const requestCreate = (payload: ProductFormValues) =>
    api.post('/productsEdit', payload);

export const requestEdit = (payload: ProductFormValues) =>
    api.put('/productsEdit', payload);

export const requestRemove = (productId: number) =>
    api.delete(`/productsEdit/${productId}`);
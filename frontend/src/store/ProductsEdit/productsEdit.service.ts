import api from '../../services/api';
import { ProductFormValues } from './productsEdit.type';

export const requestCreate = (payload: ProductFormValues) =>
    api.post('/products', payload);

export const requestEdit = (payload: ProductFormValues) =>
    api.put(`/products/${payload.id}`, payload);

export const requestRemove = (productId: string) =>
    api.delete(`/products/${productId}`);
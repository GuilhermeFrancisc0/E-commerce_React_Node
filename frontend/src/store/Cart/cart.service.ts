import api from '../../services/api';
import { Product } from '../Products/products.type';

export const requestList = () =>
    api.get<Product[]>('/cart');

export const requestAdd = (productId: string) =>
    api.post<Product[]>(`/cart/${productId}`);

export const requestRemove = (productId: string) =>
    api.delete(`/cart/${productId}`);

export const requestFinalize = () =>
    api.post('/cart/finalize');
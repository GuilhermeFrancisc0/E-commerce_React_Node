import api from '../../services/api';
import { Product } from '../Products/products.type';

export const requestList = () =>
    api.get<Product[]>('/products/cart');

export const requestAdd = (productId: string) =>
    api.post<Product[]>(`/products/cart/${productId}`);

export const requestRemove = (productIdx: number) =>
    api.delete<Product[]>(`/products/cart/${productIdx}`);

export const requestFinalize = () =>
    api.post('/products/cart/finalize');
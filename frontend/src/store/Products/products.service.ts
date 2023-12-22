import api from '../../services/api';
import { Product, ProductListParams } from './products.type';

export const requestList = (params: ProductListParams) =>
    api.get<Product[]>('/products', { params });
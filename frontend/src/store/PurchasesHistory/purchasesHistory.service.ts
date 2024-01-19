import api from '../../services/api';
import { HistoryProduct } from './purchasesHistory.type';

export const requestList = () =>
    api.get<HistoryProduct[]>('/products/purchasesHistory');

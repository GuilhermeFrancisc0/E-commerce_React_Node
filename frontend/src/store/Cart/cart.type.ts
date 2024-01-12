import { State } from '../../types/state';
import { Product } from '../Products/products.type';

export type CartState = {
    products: Product[];
    list: State;
    add: {
        loadingId: string | null;
    };
    remove: State;
    finalize: State;
}

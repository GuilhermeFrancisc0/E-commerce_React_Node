import * as yup from 'yup';

import { ProductFormValues } from '../../../store/ProductsEdit/productsEdit.type';

export const createSchema: yup.ObjectSchema<ProductFormValues> = yup.object({
    id: yup.string(),
    name: yup.string().required('Campo Obrigatório!'),
    imgSrc: yup.string().required('Campo Obrigatório!'),
    price: yup.number().min(1,'Valor não pode ser menor que R$ 01,00').required('Campo Obrigatório!'),
})
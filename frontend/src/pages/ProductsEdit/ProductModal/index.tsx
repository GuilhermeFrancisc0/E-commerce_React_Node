import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, DialogContent, Grid } from '@mui/material';

import TextInput from '../../../components/Inputs/TextInput';
import Modal from '../../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IUseDisclose } from '../../../hooks/util';
import { createRequest, editRequest } from '../../../store/ProductsEdit/productsEdit.slice';
import { Product, ProductFormValues } from '../../../store/ProductsEdit/productsEdit.type';
import { createSchema } from '../../../util/schemas/ProductsEdit';

type Props = {
    modal: IUseDisclose;
    productToEdit?: Product | null;
}

const EMPTY_IMG = 'https://www.boomkwekerijwouters.be/images/Assort_nophoto.jpg';

const ProductModal: React.FC<Props> = ({ modal, productToEdit }) => {
    const dispatch = useAppDispatch();

    const { create, edit } = useAppSelector(state => state.productsEdit);

    const [imgSrc, setImgSrc] = React.useState(EMPTY_IMG);
    const [imgSrcError, setImgSrcError] = React.useState(false);

    const defaultValues: ProductFormValues = {
        id: '',
        name: '',
        imgSrc: '',
        price: 0,
    }

    const form = useForm<ProductFormValues>({
        defaultValues,
        resolver: yupResolver(createSchema)
    });

    const formImgSrc = form.watch('imgSrc');

    const formSubmithandler = (values: ProductFormValues) => {
        if (!imgSrcError) {
            if (values.id)
                dispatch(editRequest(values));
            else
                dispatch(createRequest(values));
        } else {
            form.setError('imgSrc', { message: 'Nenhuma Imagem Encontrada' });
        }
    }

    React.useEffect(() => {
        if (productToEdit?.id) {
            form.reset({ ...productToEdit });
        } else {
            form.reset(defaultValues);
            setImgSrc(EMPTY_IMG);
        }
    }, [modal.isOpen])

    React.useEffect(() => {
        if (create.success || edit.success)
            modal.onClose();
    }, [create, edit])

    return (
        <Modal
            maxWidth="sm"
            open={modal.isOpen}
            onClose={modal.onClose}
            title={productToEdit?.id ? 'Editar Produto' : 'Cadastrar Produto'}
        >
            <DialogContent>
                <FormProvider {...form}>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12}>
                            <TextInput
                                label='Nome'
                                name='name'
                                placeholder='Digite o Nome do Produto'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput
                                type='number'
                                label='Preço'
                                name='price'
                                placeholder='Digite o Preço do Produto'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput
                                label='Imagem'
                                name='imgSrc'
                                placeholder='Digite o Endereço da Imagem do Produto'
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                            <img
                                style={{ display: 'none' }}
                                src={formImgSrc}
                                onError={() => {
                                    if (formImgSrc) {
                                        // form.setError('imgSrc', { message: 'Nenhuma Imagem Encontrada' });
                                        setImgSrcError(true);
                                    }
                                }}
                                onLoad={() => {
                                    // form.clearErrors('imgSrc');
                                    setImgSrcError(false);
                                    setImgSrc(formImgSrc);
                                }}
                            />
                            <img
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                src={imgSrc && !imgSrcError ? imgSrc : EMPTY_IMG}
                            />
                        </Grid>

                        <Grid item xs={12} mt={1}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={form.handleSubmit(formSubmithandler)}
                                disabled={create.loading || edit.loading}
                            >
                                {create.loading || edit.loading ? <CircularProgress size={24.5} /> :
                                    productToEdit?.id ? 'Editar' : 'Cadastrar'}
                            </Button>
                        </Grid>
                    </Grid>
                </FormProvider>
            </DialogContent>
        </Modal>
    );
};

export default ProductModal;
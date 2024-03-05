import React from 'react';

import { Box, Button, DialogContent, Rating, TextField } from '@mui/material';

import Modal from '../../../../components/Modal';
import { PAGINATION_LIMIT } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { IUseDisclose } from '../../../../hooks/util';
import { listRequest, sendEvaluationRequest } from '../../../../store/Products/products.slice';
import { ProductEvaluationPayload } from '../../../../store/Products/products.type';

type Props = {
    modal: IUseDisclose;
    productId: string;
}

const SendEvaluationModal: React.FC<Props> = ({ modal, productId }) => {
    const dispatch = useAppDispatch();

    const { filters } = useAppSelector(state => state.products);
    const { sendEvaluation: { loading, success } } = useAppSelector(state => state.products);

    const defaultValues: ProductEvaluationPayload = {
        rating: null,
        comment: '',
        productId
    }

    const [form, setForm] = React.useState(defaultValues);

    const sendEvaluation = () => {
        dispatch(sendEvaluationRequest(form))
    }

    React.useEffect(() => {
        setForm(defaultValues);
    }, [modal.isOpen])

    React.useEffect(() => {
        if (success) {
            modal.onClose();
            dispatch(listRequest({ page: 0, limit: PAGINATION_LIMIT, ...filters.selecteds }));
        }
    }, [success])

    return (
        <Modal
            fullWidth
            open={modal.isOpen}
            onClose={modal.onClose}
            title='Enviar Avaliação'
        >
            <DialogContent>
                <Rating
                    size='large'
                    value={form.rating}
                    onChange={(_, v) => setForm(curr => { return { ...curr, rating: v } })}
                />

                <TextField
                    label='Comentário'
                    name='comment'
                    placeholder='Digite um comentário para este produto'
                    value={form.comment}
                    onChange={(v) => setForm(curr => { return { ...curr, comment: v.target.value } })}
                    multiline
                    minRows={2}
                    maxRows={5}
                    fullWidth
                />

                <Box mt={2} display='flex' justifyContent='flex-end'>
                    <Button
                        variant='contained'
                        onClick={sendEvaluation}
                        disabled={!Number.isInteger(form.rating) || loading}
                    >
                        Enviar
                    </Button>
                </Box>
            </DialogContent>
        </Modal>
    );
};

export default SendEvaluationModal;
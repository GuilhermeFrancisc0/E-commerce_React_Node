import React from 'react';

import { Avatar, Box, Button, CardMedia, DialogContent, Grid, Rating, Typography } from '@mui/material';

import Modal from '../../../components/Modal';
import { useAppSelector } from '../../../hooks';
import { IUseDisclose, useDisclose } from '../../../hooks/util';
import { Product } from '../../../store/Products/products.type';
import SendEvaluationModal from './SendEvaluationModal';

type Props = {
    modal: IUseDisclose;
    product?: Product;
}

const EvaluateModal: React.FC<Props> = ({ modal, product }) => {
    const { userInfo } = useAppSelector(state => state.auth);

    const { sendEvaluation: { success } } = useAppSelector(state => state.products);

    const sendEvaluationModal = useDisclose();

    React.useEffect(() => {
        if (success)
            modal.onClose();
    }, [success])

    return (
        <>
            <Modal
                fullWidth
                open={modal.isOpen}
                onClose={modal.onClose}
                title={`Avaliação do Produto - ${product?.name}`}
            >
                <DialogContent>
                    <Box display='flex' justifyContent='center'>
                        <CardMedia
                            sx={{ width: '50%' }}
                            component="img"
                            src={product?.imgSrc}
                        />
                    </Box>

                    <Grid paddingY={2} container alignItems='center' justifyContent='space-between'>
                        <Grid item container xs={12} sm={6} display='flex' alignItems='center'>
                            <Typography variant="h6" mr={1}>
                                Avaliações ({product?.evaluations?.length})
                            </Typography>
                            <Rating defaultValue={product?.evaluations?.reduce((acc, curr) => acc + curr.rating, 0)} readOnly />
                        </Grid>
                        <Grid item xs={12} sm={6} display='flex' justifyContent='flex-end'>
                            <Button
                                variant="contained"
                                onClick={sendEvaluationModal.onOpen}
                                disabled={product?.evaluations?.some(e => e.username === userInfo.username)}
                            >
                                {
                                    product?.evaluations?.some(e => e.username === userInfo.username) ?
                                        'Avaliação já Adicionada' :
                                        'Adicionar Avaliação'
                                }
                            </Button>
                        </Grid>
                    </Grid>

                    <Box>
                        {product?.evaluations?.map(e => (
                            <Box mb={1}>
                                <Box display='flex' alignItems='center'>
                                    <Avatar sx={{ mr: 1 }}>
                                        {e.username.charAt(0)}
                                    </Avatar>
                                    {e.username}
                                    <Rating sx={{ mr: 1, ml: 1 }} defaultValue={e.rating} readOnly />
                                    {new Date(e.createdAt).toLocaleString("pt-br")}
                                </Box>
                                <Box>{e.comment}</Box>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
            </Modal>

            <SendEvaluationModal modal={sendEvaluationModal} productId={product?.id || ''} />
        </>
    );
};

export default EvaluateModal;
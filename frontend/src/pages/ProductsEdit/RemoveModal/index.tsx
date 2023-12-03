import React from 'react';

import { Button, DialogActions, DialogContent } from '@mui/material';

import Modal from '../../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IUseDisclose } from '../../../hooks/util';
import { removeRequest } from '../../../store/ProductsEdit/productsEdit.slice';

type Props = {
    modal: IUseDisclose;
    productId?: string | null;
}

const RemoveModal: React.FC<Props> = ({ modal, productId }) => {
    const dispatch = useAppDispatch();

    const { remove: { loading, success } } = useAppSelector(state => state.productsEdit);

    const handleConfirm = () => {
        if (productId)
            dispatch(removeRequest(productId));
    }

    React.useEffect(() => {
        if (success)
            modal.onClose();
    }, [success])
    return (
        <Modal open={modal.isOpen} onClose={modal.onClose} title='Remover Produto'>
            <DialogContent>
                Deseja Realmente Remover Permanentemente este Produto?
            </DialogContent>
            <DialogActions sx={{ padding: '0px 24px 20px' }}>
                <Button
                    variant='outlined'
                    disabled={loading}
                    onClick={modal.onClose}
                >
                    Cancelar
                </Button>
                <Button
                    variant='contained'
                    disabled={loading}
                    onClick={handleConfirm}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Modal>
    );
};

export default RemoveModal;
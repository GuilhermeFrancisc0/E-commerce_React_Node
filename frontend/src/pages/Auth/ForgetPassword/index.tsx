import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, DialogContent, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';

import TextInput from '../../../components/Inputs/TextInput';
import Modal from '../../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IUseDisclose } from '../../../hooks/util';
import { forgetPasswordRequest } from '../../../store/Auth/auth.slice';
import { ForgetPasswordFormValues } from '../../../store/Auth/auth.type';
import { forgetPasswordSchema } from '../../../util/schemas/Auth';

type Props = {
    modal: IUseDisclose;
    openSignInModal: () => void;
}

const ForgetPassword: React.FC<Props> = ({ modal, openSignInModal }) => {
    const dispatch = useAppDispatch();

    const { forgetPassword: { loading } } = useAppSelector(state => state.auth);

    const form = useForm<ForgetPasswordFormValues>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(forgetPasswordSchema)
    });

    const handleOpenSignInModal = () => {
        if (!loading) {
            modal.onClose();
            openSignInModal();
        }
    }

    const formSubmithandler = (values: ForgetPasswordFormValues) => {
        dispatch(forgetPasswordRequest(values));
    }

    React.useEffect(() => {
        form.reset();
    }, [modal.isOpen])

    return (
        <Modal maxWidth="xs" open={modal.isOpen} onClose={modal.onClose}>
            <DialogContent>
                <Typography
                    sx={{ mt: 4, mb: '52px' }}
                    color='primary.main'
                    variant='h5'
                    textAlign='center'
                >
                    Recuperação de Senha
                </Typography>
                <FormProvider {...form}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{ mt: 4, mb: '52px' }}
                                color='primary.main'
                                component='span'
                                textAlign='center'
                            >
                                Informe o email cadastrado no sistema
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput type='email' label='Email' name='email' />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={form.handleSubmit(formSubmithandler)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24.5} /> : 'Enviar'}
                            </Button>
                        </Grid>

                        <Grid
                            sx={{ fontSize: '12px', userSelect: 'none' }}
                            item
                            xs={12}
                            display='flex'
                            justifyContent='center'
                        >
                            Voltar para o
                            <Link
                                sx={{ cursor: 'pointer', ml: '0.5ch', fontWeight: 'bold' }}
                                underline="hover"
                                onClick={handleOpenSignInModal}
                            >
                                Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </ FormProvider>
            </DialogContent>
        </Modal>
    );
};

export default ForgetPassword;
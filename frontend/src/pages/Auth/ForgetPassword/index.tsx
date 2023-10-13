import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DialogContent, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';

import TextInput from '../../../components/Inputs/TextInput';
import Modal from '../../../components/Modal';
import { IUseDisclose } from '../../../hooks/util';
import { forgetPasswordSchema } from '../../../util/schemas/Auth';

export type ForgetPasswordFormValues = {
    email: string;
}

type Props = {
    modal: IUseDisclose;
    openSignInModal: () => void;
}

const ForgetPassword: React.FC<Props> = ({ modal, openSignInModal }) => {

    const { control, handleSubmit } = useForm<ForgetPasswordFormValues>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(forgetPasswordSchema)
    });

    const handleOpenSignInModal = () => {
        modal.onClose();
        openSignInModal();
    }

    const formSubmithandler = (values: ForgetPasswordFormValues) => {
        console.log("ForgetPassword", values)
    }

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
                <form onSubmit={handleSubmit(formSubmithandler)}>
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
                            <TextInput
                                type='email'
                                label='Email'
                                name='email'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained">Enviar</Button>
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
                </ form>
            </DialogContent>
        </Modal>
    );
};

export default ForgetPassword;
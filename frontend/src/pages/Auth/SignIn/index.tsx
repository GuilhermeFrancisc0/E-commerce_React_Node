import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, DialogContent, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import TextInput from '../../../components/Inputs/TextInput';
import Modal from '../../../components/Modal';
import { IUseDisclose, useDisclose } from '../../../hooks/util';
import { signInSchema } from '../../../util/schemas/Auth';

export type SignInFormValues = {
    username: string;
    password: string;
}

type Props = {
    modal: IUseDisclose;
    signUpModal: IUseDisclose;
    forgetPasswordModal: IUseDisclose;
}

const SignIn: React.FC<Props> = ({ modal, signUpModal, forgetPasswordModal }) => {

    const passwordInput = useDisclose();

    const { control, handleSubmit } = useForm<SignInFormValues>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(signInSchema)
    });

    const handleOpenForgetPasswordModal = () => {
        modal.onClose();
        forgetPasswordModal.onOpen();
    }

    const handleOpenSignUpModal = () => {
        modal.onClose();
        signUpModal.onOpen();
    }

    const formSubmithandler = (values: SignInFormValues) => {
        console.log("SignIn", values)
    }

    return (
        <Modal maxWidth="xs" open={modal.isOpen} onClose={modal.onClose}>
            <DialogContent>
                <Typography
                    sx={{ mt: 4, mb: '52px' }}
                    color='primary.main'
                    variant='h3'
                    textAlign='center'
                >
                    Sign in
                </Typography>

                <form onSubmit={handleSubmit(formSubmithandler)}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <TextInput
                                label='Usuário'
                                name='username'
                                placeholder='Digite seu Usuário'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput
                                type={passwordInput.isOpen ? 'text' : 'password'}
                                label='Senha'
                                name='password'
                                placeholder='Digite sua Senha'
                                control={control}
                                InputProps={{
                                    endAdornment:
                                        <IconButton color='primary' onClick={passwordInput.onToggle}>
                                            {passwordInput.isOpen ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='flex-end'>
                            <Link
                                sx={{
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    fontSize: '14px'
                                }}
                                underline="hover"
                                onClick={handleOpenForgetPasswordModal}
                            >
                                Esqueceu a Senha?
                            </Link>
                        </Grid>

                        <Grid item xs={12}>
                            <Button type='submit' fullWidth variant="contained">Sign in</Button>
                        </Grid>

                        <Grid
                            sx={{ fontSize: '12px', userSelect: 'none' }}
                            item
                            xs={12}
                            display='flex'
                            justifyContent='center'
                        >
                            Não tem conta? Realize o
                            <Link
                                sx={{ cursor: 'pointer', ml: '0.5ch', fontWeight: 'bold' }}
                                underline="hover"
                                onClick={handleOpenSignUpModal}
                            >
                                Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Modal>
    );
};

export default SignIn;
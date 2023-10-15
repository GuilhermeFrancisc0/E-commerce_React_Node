import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, DialogContent, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import TextInput from '../../../components/Inputs/TextInput';
import Modal from '../../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IUseDisclose, useDisclose } from '../../../hooks/util';
import { signInRequest } from '../../../store/Auth/auth.slice';
import { SignInFormValues } from '../../../store/Auth/auth.type';
import { signInSchema } from '../../../util/schemas/Auth';

type Props = {
    modal: IUseDisclose;
    signUpModal: IUseDisclose;
    forgetPasswordModal: IUseDisclose;
}

const SignIn: React.FC<Props> = ({ modal, signUpModal, forgetPasswordModal }) => {
    const dispatch = useAppDispatch();

    const { signIn: { loading } } = useAppSelector(state => state.auth);

    const passwordInput = useDisclose();

    const form = useForm<SignInFormValues>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(signInSchema)
    });

    const handleOpenForgetPasswordModal = () => {
        if (!loading) {
            modal.onClose();
            forgetPasswordModal.onOpen();
        }
    }

    const handleOpenSignUpModal = () => {
        if (!loading) {
            modal.onClose();
            signUpModal.onOpen();
        }
    }

    const formSubmithandler = (values: SignInFormValues) => {
        dispatch(signInRequest(values));
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
                    variant='h3'
                    textAlign='center'
                >
                    Sign in
                </Typography>

                <FormProvider {...form}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <TextInput
                                label='Usuário'
                                name='username'
                                placeholder='Digite seu Usuário'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput
                                type={passwordInput.isOpen ? 'text' : 'password'}
                                label='Senha'
                                name='password'
                                placeholder='Digite sua Senha'
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
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={form.handleSubmit(formSubmithandler)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24.5} /> : 'Sign In'}
                            </Button>
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
                </FormProvider>
            </DialogContent>
        </Modal>
    );
};

export default SignIn;
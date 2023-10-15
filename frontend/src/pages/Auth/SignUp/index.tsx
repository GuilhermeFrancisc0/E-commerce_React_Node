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
import { signUpRequest } from '../../../store/Auth/auth.slice';
import { SignUpFormValues } from '../../../store/Auth/auth.type';
import { signUpSchema } from '../../../util/schemas/Auth';

type Props = {
    modal: IUseDisclose;
    openSignInModal: () => void;
}

const SignUp: React.FC<Props> = ({ modal, openSignInModal }) => {
    const dispatch = useAppDispatch();

    const { signUp: { loading } } = useAppSelector(state => state.auth);

    const passwordInput = useDisclose();

    const form = useForm<SignUpFormValues>({
        defaultValues: {
            email: '',
            username: '',
            password: '',
        },
        resolver: yupResolver(signUpSchema)
    });

    const handleOpenSignInModal = () => {
        if (!loading) {
            modal.onClose();
            openSignInModal();
        }
    }

    const formSubmithandler = (values: SignUpFormValues) => {
        dispatch(signUpRequest(values));
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
                    Sign Up
                </Typography>

                <FormProvider {...form}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <TextInput label='Email' name='email' />
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput label='Usuário' name='username' />
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput
                                type={passwordInput.isOpen ? 'text' : 'password'}
                                label='Senha'
                                name='password'
                                InputProps={{
                                    endAdornment:
                                        <IconButton color='primary' onClick={passwordInput.onToggle}>
                                            {passwordInput.isOpen ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={form.handleSubmit(formSubmithandler)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24.5} /> : 'Sign Up'}
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
                </FormProvider>
            </DialogContent>
        </Modal>
    );
};

export default SignUp;
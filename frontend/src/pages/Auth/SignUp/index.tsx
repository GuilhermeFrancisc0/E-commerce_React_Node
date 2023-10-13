import React from 'react';
import { useForm } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, DialogContent, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import TextInput from '../../../components/Inputs/TextInput';
import Modal from '../../../components/Modal';
import { IUseDisclose, useDisclose } from '../../../hooks/util';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../../util/schemas/Auth';

export type SignUpFormValues = {
    email: string;
    username: string;
    password: string;
}

type Props = {
    modal: IUseDisclose;
    openSignInModal: () => void;
}

const SignUp: React.FC<Props> = ({ modal, openSignInModal }) => {

    const passwordInput = useDisclose();

    const { control, handleSubmit } = useForm<SignUpFormValues>({
        defaultValues: {
            email: '',
            username: '',
            password: '',
        },
        resolver: yupResolver(signUpSchema)
    });


    const handleOpenSignInModal = () => {
        modal.onClose();
        openSignInModal();
    }

    const formSubmithandler = (values: SignUpFormValues) => {
        console.log("SignUp", values)
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
                    Sign Up
                </Typography>

                <form onSubmit={handleSubmit(formSubmithandler)}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <TextInput
                                label='Email'
                                name='email'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput
                                label='Usuário'
                                name='username'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextInput
                                type={passwordInput.isOpen ? 'text' : 'password'}
                                label='Senha'
                                name='password'
                                control={control}
                                InputProps={{
                                    endAdornment:
                                        <IconButton color='primary' onClick={passwordInput.onToggle}>
                                            {passwordInput.isOpen ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained">Sign Up</Button>
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
                </form>
            </DialogContent>
        </Modal>
    );
};

export default SignUp;
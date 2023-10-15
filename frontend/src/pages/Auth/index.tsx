import React from 'react';

import { useAppSelector } from '../../hooks';
import { IUseDisclose, useDisclose } from '../../hooks/util';
import ForgetPassword from './ForgetPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';

type Props = {
  signInModal: IUseDisclose;
}

const Auth: React.FC<Props> = ({ signInModal }) => {
  const { user } = useAppSelector(state => state.auth);

  const signUpModal = useDisclose();
  const forgetPasswordModal = useDisclose();

  React.useEffect(() => {
    if (user.token) {
      signInModal.onClose();
      signUpModal.onClose();
      forgetPasswordModal.onClose();
    }
  }, [user])

  return (
    <>
      <SignIn modal={signInModal} signUpModal={signUpModal} forgetPasswordModal={forgetPasswordModal} />
      <SignUp modal={signUpModal} openSignInModal={signInModal.onOpen} />
      <ForgetPassword modal={forgetPasswordModal} openSignInModal={signInModal.onOpen} />
    </>
  );
};

export default Auth;
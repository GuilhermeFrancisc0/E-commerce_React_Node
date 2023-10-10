import React from 'react';

import { DialogContent } from '@mui/material';

import Modal from '../../components/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
}

const Auth: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <DialogContent>
        Login
      </DialogContent>
    </Modal>
  );
};

export default Auth;
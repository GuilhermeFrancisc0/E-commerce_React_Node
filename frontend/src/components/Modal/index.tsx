import * as React from 'react';

import { ModalOwnProps } from '@mui/base/Modal/Modal.types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  title?: string;
  children: React.ReactNode;
} & ModalOwnProps;

const Modal: React.FC<Props> = ({ title, children, ...props }) => {
  return (
    <Dialog {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {children}
    </Dialog>
  );
}

export default Modal;
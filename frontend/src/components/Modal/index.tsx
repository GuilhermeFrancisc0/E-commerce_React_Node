import * as React from 'react';

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  title?: string;
  children: React.ReactNode;
} & DialogProps;

const Modal: React.FC<Props> = ({ title, children, ...props }) => {
  return (
    <Dialog {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {children}
    </Dialog>
  );
}

export default Modal;
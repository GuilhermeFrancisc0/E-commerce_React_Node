import React from 'react';

import { Button } from '@mui/material';

import api from '../../services/api';

const Products: React.FC = () => {

  const get = async () => {
    await api.get('/user');
  }

  return (
    <>
      <Button onClick={get} variant="contained">Get Users</Button>
    </>
  );
};

export default Products;
import React from 'react';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import ProductCard from '../../components/ProductCard';
import { productsMock } from '../Products/mock';

const ProductsEdit: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant='contained'>Cadastrar Novo Produto</Button>
        </Grid>
        <Grid item container spacing={2} >
          {productsMock.map(product => (
            <Grid key={product.name} item  xl={2} lg={3} md={4} sm={6} xs={12}>
              <ProductCard {...product} editMode></ProductCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductsEdit;
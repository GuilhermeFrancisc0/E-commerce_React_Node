import React from 'react';

import { Grid } from '@mui/material';

import ProductCard from '../../components/ProductCard';
import { productsMock } from './mock';

const Products: React.FC = () => {
  return (
    <Grid item container spacing={2} >
      {productsMock.map(product => (
        <Grid key={product.name} item xl={2} lg={3} md={4} sm={6} xs={12}>
          <ProductCard {...product}></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
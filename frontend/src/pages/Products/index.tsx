import React from 'react';

import { Grid } from '@mui/material';

import ProductCard from '../../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { listRequest } from '../../store/Products/products.slice';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector(state => state.products);

  React.useEffect(() => {
    dispatch(listRequest({ page: 0, limit: 12 }));
  }, []);

  return (
    <Grid item container spacing={2}>
      {list.products.map(product => (
        <Grid key={product.name} item xl={2} lg={3} md={4} sm={6} xs={12}>
          <ProductCard {...product}></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
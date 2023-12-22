import React from 'react';

import { Grid } from '@mui/material';

import InfiniteScroll from '../../components/InfiniteScroll';
import ProductCard from '../../components/ProductCard';
import { PAGINATION_LIMIT } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { listRequest } from '../../store/Products/products.slice';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list: { loading, page, totalPages, products } } = useAppSelector(state => state.products);

  const nextPage = () => {
    dispatch(listRequest({ page: page + 1, limit: PAGINATION_LIMIT }))
  }

  React.useEffect(() => {
    dispatch(listRequest({ page: 0, limit: PAGINATION_LIMIT }));
  }, []);

  return (
    <InfiniteScroll
      direction='down'
      loading={loading}
      isLastPage={page + 1 >= totalPages}
      nextPage={nextPage}
    >
      <Grid item container spacing={2} p={2}>
        {products.map(product => (
          <Grid key={product.name} item xl={2} lg={3} md={4} sm={6} xs={12}>
            <ProductCard {...product}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default Products;
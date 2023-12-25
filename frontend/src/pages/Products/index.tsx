import React from 'react';

import { Grid } from '@mui/material';

import InfiniteScroll from '../../components/InfiniteScroll';
import ProductCard from '../../components/Products/Card';
import FiltersButton from '../../components/Products/FiltersButton';
import { PAGINATION_LIMIT } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  favoriteRequest, filtersOptionsRequest, listRequest
} from '../../store/Products/products.slice';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list, favorite, filters } = useAppSelector(state => state.products);

  const nextPage = () => {
    dispatch(listRequest({ page: list.page + 1, limit: PAGINATION_LIMIT, ...filters.selecteds }))
  }

  const handleFavorite = (productId: string | undefined) => {
    if (productId)
      dispatch(favoriteRequest(productId));
  }

  React.useEffect(() => {
    dispatch(filtersOptionsRequest());
    dispatch(listRequest({ page: 0, limit: PAGINATION_LIMIT, ...filters.selecteds }));
  }, []);

  return (
    <InfiniteScroll
      direction='down'
      loading={list.loading}
      isLastPage={list.page + 1 >= list.totalPages}
      nextPage={nextPage}
    >
      <Grid item container spacing={2} p={2}>
        <Grid item display='flex' justifyContent='flex-end' xs={12}>
          <FiltersButton
            list={list}
            filters={filters}
            handleClearFilters={() => dispatch(listRequest({ page: 0, limit: PAGINATION_LIMIT }))}
            handleSendFilters={form => dispatch(listRequest({ page: 0, limit: PAGINATION_LIMIT, ...form }))}
          />
        </Grid>
        {list.products.map(product => (
          <Grid key={product.name} item xl={2} lg={3} md={4} sm={6} xs={12}>
            <ProductCard
              {...product}
              favoriteLoading={favorite.loadingId}
              handleFavorite={() => handleFavorite(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default Products;
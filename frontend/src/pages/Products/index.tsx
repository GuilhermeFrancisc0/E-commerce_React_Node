import React from 'react';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Grid, Typography } from '@mui/material';

import InfiniteScroll from '../../components/InfiniteScroll';
import ProductCard from '../../components/Products/Card';
import FiltersButton from '../../components/Products/FiltersButton';
import { PAGINATION_LIMIT } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useDisclose } from '../../hooks/util';
import { addRequest } from '../../store/Cart/cart.slice';
import {
  favoriteRequest, filtersOptionsRequest, listRequest
} from '../../store/Products/products.slice';
import { Product } from '../../store/Products/products.type';
import EvaluateModal from './EvaluationModal';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list, favorite, filters } = useAppSelector(state => state.products);
  const { add: { loadingId: addToCartLoading } } = useAppSelector(state => state.cart);

  const evaluateModal = useDisclose();

  const [productToEvaluate, setProductToEvaluate] = React.useState<Product>();

  const nextPage = () => {
    dispatch(listRequest({ page: list.page + 1, limit: PAGINATION_LIMIT, ...filters.selecteds }))
  }

  const handleEvaluate = (product: Product) => {
    setProductToEvaluate(product);
    evaluateModal.onOpen();
  }

  const handleFavorite = (productId: string) => {
    dispatch(favoriteRequest(productId));
  }

  const handleAddToCart = (productId: string) => {
    dispatch(addRequest(productId));
  }

  React.useEffect(() => {
    dispatch(filtersOptionsRequest());
    dispatch(listRequest({ page: 0, limit: PAGINATION_LIMIT, ...filters.selecteds }));
  }, []);

  return (
    <>
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
          {list.products.length ?
            <>
              {list.products.map(product => (
                <Grid key={product.name} item xl={2} lg={3} md={4} sm={6} xs={12}>
                  <ProductCard
                    {...product}
                    favoriteLoading={favorite.loadingId}
                    cartLoading={addToCartLoading}
                    handleEvaluate={() => handleEvaluate(product)}
                    handleFavorite={() => handleFavorite(product.id as string)}
                    handleAddToCart={() => handleAddToCart(product.id as string)}
                  />
                </Grid>
              ))}
            </>
            :
            <>
              {
                !list.loading &&
                <Grid
                  item
                  xs={12}
                  height='70vh'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  flexDirection='column'
                >
                  <ProductionQuantityLimitsIcon sx={{ fontSize: 130, color: theme => theme.palette.primary.light }} />
                  <Typography fontSize={30} sx={{ color: theme => theme.palette.primary.light }}>
                    Nenhum Produto Encontrado
                  </Typography>
                </Grid>
              }
            </>
          }
        </Grid>
      </InfiniteScroll>

      <EvaluateModal modal={evaluateModal} product={productToEvaluate} />
    </>
  );
};

export default Products;
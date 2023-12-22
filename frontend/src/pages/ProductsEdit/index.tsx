import React from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import InfiniteScroll from '../../components/InfiniteScroll';
import ProductCard from '../../components/ProductCard';
import { PAGINATION_LIMIT } from '../../constants';
import { useAppSelector } from '../../hooks';
import { useDisclose } from '../../hooks/util';
import { Product } from '../../store/Products/products.type';
import { listRequest } from '../../store/ProductsEdit/productsEdit.slice';
import ProductModal from './ProductModal';
import RemoveModal from './RemoveModal';

const ProductsEdit: React.FC = () => {
  const dispatch = useDispatch();

  const [productToEdit, setProductToEdit] = React.useState<Product | null>(null);
  const [productIdToRemove, setProductIdToRemove] = React.useState<string | null>(null);

  const { list: { loading, products, totalPages, page } } = useAppSelector(state => state.productsEdit);

  const productModal = useDisclose();
  const removeModal = useDisclose();

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    productModal.onOpen();
  }

  const handleRemove = (productId: string) => {
    setProductIdToRemove(productId);
    removeModal.onOpen();
  }

  const nextPage = () => {
    dispatch(listRequest({ page: page + 1, limit: PAGINATION_LIMIT }))
  };

  React.useEffect(() => {
    dispatch(listRequest({ page: 0, limit: PAGINATION_LIMIT }));
  }, []);

  React.useEffect(() => {
    if (!productModal.isOpen)
      setProductToEdit(null);
  }, [productModal.isOpen]);

  React.useEffect(() => {
    if (!removeModal.isOpen)
      setProductIdToRemove(null);
  }, [removeModal.isOpen]);

  return (
    <>
      <InfiniteScroll
        direction='down'
        loading={loading}
        isLastPage={page + 1 >= totalPages}
        nextPage={nextPage}
      >
        <Grid container spacing={2} p={2}>
          <Grid item xs={12}>
            <Button variant='contained' onClick={productModal.onOpen}>Cadastrar Novo Produto</Button>
          </Grid>
          <Grid item container spacing={2}>
            {products.map(product => (
              <Grid key={product.id} item xl={2} lg={3} md={4} sm={6} xs={12}>
                <ProductCard
                  {...product}
                  editMode
                  handleEdit={() => handleEdit(product)}
                  handleRemove={() => handleRemove(product.id || '')}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </InfiniteScroll>

      <ProductModal modal={productModal} productToEdit={productToEdit} />
      <RemoveModal modal={removeModal} productId={productIdToRemove} />
    </>
  );
};

export default ProductsEdit;
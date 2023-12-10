import React from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import ProductCard from '../../components/ProductCard';
import { useAppSelector } from '../../hooks';
import { useDisclose } from '../../hooks/util';
import { listRequest } from '../../store/ProductsEdit/productsEdit.slice';
import { Product } from '../../store/ProductsEdit/productsEdit.type';
import ProductModal from './ProductModal';
import RemoveModal from './RemoveModal';

const ProductsEdit: React.FC = () => {
  const dispatch = useDispatch();

  const [productToEdit, setProductToEdit] = React.useState<Product | null>(null);
  const [productIdToRemove, setProductIdToRemove] = React.useState<string | null>(null);

  const { list } = useAppSelector(state => state.productsEdit);

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

  React.useEffect(() => {
    dispatch(listRequest({ page: 0, limit: 12 }));
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant='contained' onClick={productModal.onOpen}>Cadastrar Novo Produto</Button>
        </Grid>
        <Grid item container spacing={2} >
          {list.products.map(product => (
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

      <ProductModal modal={productModal} productToEdit={productToEdit} />
      <RemoveModal modal={removeModal} productId={productIdToRemove} />
    </>
  );
};

export default ProductsEdit;
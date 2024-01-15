import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {
  Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { finalizeRequest, removeRequest } from '../../store/Cart/cart.slice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products, list } = useAppSelector(state => state.cart);

  const removeFromCart = (productIdx: number) => {
    dispatch(removeRequest(productIdx));
  }

  const finalizePurchase = () => {
    dispatch(finalizeRequest());
  }

  return (
    <Box sx={{ width: { xs: "80vw", md: "30vw" } }} height='100vh' p={2}>
      <Box height='10%' display='flex' justifyContent='center' alignItems='center'>
        <Typography
          paddingBottom={2}
          color='primary.main'
          variant='h5'
          textAlign='center'
        >
          Carrinho
        </Typography>
      </Box>

      <Box overflow='auto' height='80%'>
        {products.length ?
          <>
            {products.map((product, i) => (
              <Box key={product.name + '_' + i} paddingBottom={2}>
                <Card sx={{
                  position: 'relative',
                  transition: 'box-shadow .5s',
                  '&:hover': { boxShadow: 5 },
                }}>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      color: theme => theme.palette.primary.main,
                    }}
                    onClick={() => removeFromCart(i)}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                  <CardContent sx={{ padding: "0 !important" }}>
                    <Grid container>
                      <Grid item xs={6} overflow='hidden'>
                        <CardMedia
                          sx={{
                            transition: 'transform .5s ease-in-out',
                            '&:hover': { transform: 'scale(1.2)' }
                          }}
                          component="img"
                          src={product.imgSrc}
                        />
                      </Grid>

                      <Grid item xs={6} p={2}>
                        <Typography gutterBottom variant="h6" component="div">
                          {product.name}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </>
          :
          <>
            {
              !list.loading &&
              <Box
                height='100%'
                width='100%'
                display='flex'
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
              >
                <ProductionQuantityLimitsIcon sx={{ fontSize: 120, color: theme => theme.palette.primary.light }} />
                <Typography textAlign='center' fontSize={20} sx={{ color: theme => theme.palette.primary.light }}>
                  Nenhum Produto Adicionado
                </Typography>
              </Box>
            }
          </>
        }
      </Box>

      <Box height='10%'>
        {!!products.length &&
          <>
            <Typography
              p={1}
              color='primary.main'
              variant='h5'
              textAlign='center'
            >
              Total: {products.reduce((acc, curr) => acc + curr.price, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>

            <Button
              fullWidth
              variant='contained'
              size="small"
              onClick={finalizePurchase}
            >
              Finalizar Compra
            </Button>
          </>
        }
      </Box>
    </Box >
  );
};

export default Cart;
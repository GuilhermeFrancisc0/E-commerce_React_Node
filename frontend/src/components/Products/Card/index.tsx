import React from 'react';

import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Box, CardMedia, IconButton, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Product } from '../../../store/Products/products.type';

type Props = {
  editMode?: boolean;
  handleEdit?: () => void;
  handleRemove?: () => void;
  handleFavorite?: () => void;
  favoriteLoading?: string | null;
} & Product;

const ProductCard: React.FC<Props> = ({
  id,
  name,
  imgSrc,
  rating,
  price,
  favorite,
  editMode,
  handleEdit,
  handleRemove,
  handleFavorite,
  favoriteLoading,
}) => {

  return (
    <Card sx={{
      height: '400px',
      position: 'relative',
      transition: 'box-shadow .5s',
      '&:hover': { boxShadow: 5 },
    }}>

      {!editMode && handleFavorite &&
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
            color: theme => theme.palette.primary.main
          }}
          onClick={handleFavorite}
          disabled={favoriteLoading === id}
        >
          {favorite ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
        </IconButton>
      }

      <Box sx={{
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <CardMedia
          sx={{
            transition: 'transform .5s ease-in-out',
            '&:hover': { transform: 'scale(1.2)' }
          }}
          component="img"
          src={imgSrc}
        />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>

        <Rating name="size-medium" defaultValue={rating} readOnly />

        <Typography gutterBottom variant="h5" component="div">
          {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Typography>
      </CardContent>

      <CardActions>
        {editMode ?
          <>
            <Button
              fullWidth
              variant='contained'
              size="small"
              endIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Editar
            </Button>
            <Button
              fullWidth
              color='error'
              variant='contained'
              size="small"
              endIcon={<DeleteIcon />}
              onClick={handleRemove}
            >
              Excluir
            </Button>
          </>
          :
          <Button
            fullWidth
            variant='contained'
            size="small"
            endIcon={<AddShoppingCartRoundedIcon />}
          >
            Adicionar
          </Button>}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
import React from 'react';

import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Badge, Box, Button, CircularProgress, Grid, Menu, Rating, Slider, Switch, ToggleButton, Tooltip,
  Typography
} from '@mui/material';

import { useDisclose } from '../../../hooks/util';
import {
  ProductFiltersOptions, ProductFiltersSelecteds, ProductListResponse
} from '../../../store/Products/products.type';
import {
  ProductEditFiltersOptions, ProductEditFiltersSelecteds
} from '../../../store/ProductsEdit/productsEdit.type';
import { State } from '../../../types/state';

type Props = {
  list: ProductListResponse & State;
  filters: {
    options: (ProductFiltersOptions | ProductEditFiltersOptions) & State;
    selecteds: ProductFiltersSelecteds | ProductEditFiltersSelecteds;
  };
  handleSendFilters: (form: ProductFiltersSelecteds | ProductEditFiltersSelecteds) => void;
  handleClearFilters: () => void;
}

const FiltersButton: React.FC<Props> = ({
  list,
  filters: { options, selecteds },
  handleSendFilters,
  handleClearFilters
}) => {
  const menu = useDisclose();

  const iconButtonRef = React.useRef(null);

  const [form, setForm] = React.useState(selecteds);

  const priceMarks = React.useMemo(() => {
    return [options.price?.min, options.price?.max].map(v => {
      return { value: v || 0, label: String((v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) }
    })
  }, [options.price]);

  const hasActiveFilter = React.useMemo(() => {
    const priceRangeHasChanged = selecteds.price?.min !== options.price?.min || selecteds.price?.max !== options.price?.max;

    return priceRangeHasChanged || (('favorite' in selecteds) && selecteds.favorite) || (selecteds.rating || 0) > 0;
  }, [selecteds, options]);

  React.useEffect(() => {
    if (list.success) {
      menu.onClose();
      setForm(selecteds);
    }
  }, [list.success]);

  return (
    <>
      <Tooltip title='Abrir Filtros'>
        <Box>
          <ToggleButton
            sx={{ border: 'none', borderRadius: '50%', p: '6px', '&:disabled': { border: 'none', borderRadius: '50%', p: '6px' } }}
            ref={iconButtonRef}
            value="check"
            selected={menu.isOpen}
            onChange={menu.onToggle}
            disabled={options.loading || !!!options.price}
          >
            {!options.loading ?
              <Badge color="error" variant="dot" invisible={!hasActiveFilter}>
                <FilterListIcon color='primary' />
              </Badge>
              :
              <CircularProgress size={18} />
            }
          </ToggleButton>
        </Box>
      </Tooltip >

      <Menu
        anchorEl={iconButtonRef?.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={menu.isOpen}
        onClose={menu.onClose}
      >
        <Grid container spacing={2} sx={{ width: '300px', p: 2 }}>
          <Grid item xs={12}>
            <Typography textAlign='center' variant='h6' color='primary'>Filtros</Typography>
          </Grid>


          {('favorite' in form) &&
            <Grid item xs={12}>
              <Typography color='primary'>Favoritos</Typography>
              <Switch value={Boolean(form.favorite)} onChange={(_, v) => setForm({ ...form, favorite: v })} />
            </Grid>
          }
          <Grid item xs={12}>
            <Typography color='primary'>Preço</Typography>
            <Slider
              sx={{
                width: 'calc(100% - 42px)',
                marginLeft: '21px',
                marginBottom: '4px',
                '& .MuiSlider-markLabel': {
                  fontSize: '0.6rem'
                }
              }}
              valueLabelFormat={v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              value={[form.price?.min || 0, form.price?.max || 0]}
              onChange={(_, v) => {
                const range = v as number[];
                setForm({ ...form, price: { min: range[0], max: range[1] } });
              }}
              valueLabelDisplay='auto'
              size='small'
              min={priceMarks[0].value}
              max={priceMarks[1].value}
              marks={priceMarks}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography color='primary'>Avaliação</Typography>
            <Box display='flex' sx={{ ml: '10px' }}>
              <Rating
                value={form.rating || 0}
                precision={0.5}
                onChange={(_, v) => setForm({ ...form, rating: Number(v) })}
              />
              <Typography color='primary' marginLeft={1}>e acima</Typography>
            </Box>
          </Grid>

          <Grid item display='flex' justifyContent='center' xs={12}>
            <Button
              size='small'
              variant='outlined'
              onClick={handleClearFilters}
              disabled={list.loading}
            >
              {list.loading ? <CircularProgress size={22} /> : 'Limpar'}
            </Button>
            <Button
              sx={{ ml: 1 }}
              size='small'
              variant='contained'
              onClick={() => handleSendFilters(form)}
              disabled={list.loading}
            >
              {list.loading ? <CircularProgress size={22} /> : 'Aplicar'}
            </Button>
          </Grid>
        </Grid>
      </Menu>
    </>
  );
};

export default FiltersButton;
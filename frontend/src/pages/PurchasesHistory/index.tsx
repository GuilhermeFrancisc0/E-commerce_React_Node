import React from 'react';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
    Box, Card, CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableFooter,
    TableHead, TablePagination, TableRow, Typography
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { listRequest } from '../../store/PurchasesHistory/purchasesHistory.slice';

const rowsPerPage = 6;

const PurchasesHistory: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(state => state.PurchasesHistory);

  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    dispatch(listRequest());
  }, []);

  return (
    <Box p={2}>
      <>
        {products.length ?
          <TableContainer component={Paper} >
            <Table sx={{ tableLayout: 'fixed' }}>
              <TableHead sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                <TableRow>
                  <TableCell colSpan={2} align='center' sx={{ color: "white" }}>Produto</TableCell>
                  <TableCell align='center' sx={{ color: "white" }}>Preço</TableCell>
                  <TableCell align='center' sx={{ color: "white" }}>Data da Compra</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, i) => (
                  <TableRow
                    key={product.name + '_' + i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '50px' }}
                  >
                    <TableCell sx={{ display: 'flex', justifyContent: 'right' }}>
                      <CardMedia
                        sx={{ width: '50px', maxHeight: '100%' }}
                        component="img"
                        src={product.imgSrc}
                      />
                    </TableCell>
                    <TableCell align='left'>
                      {product.name}
                    </TableCell>
                    <TableCell align='center'>
                      {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </TableCell>
                    <TableCell align='center'>
                      {new Date().toLocaleString("pt-br")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={4}
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    page={page}
                    onPageChange={(_, p) => setPage(p)}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          :
          <Card sx={{
            height: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            <WarningAmberIcon sx={{ fontSize: 130, color: theme => theme.palette.primary.light }} />
            <Typography fontSize={30} sx={{ color: theme => theme.palette.primary.light }}>
              Nenhuma Compra Efetuada
            </Typography>
          </Card>
        }
      </>
    </Box>
  );
};

export default PurchasesHistory;
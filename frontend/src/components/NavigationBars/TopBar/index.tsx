import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useDisclose } from '../../../hooks/util';
import Auth from '../../../pages/Auth';

type Props = {
  toggleSidebar: () => void;
}

export const TOPBAR_HEIGHT = 56;

const TopBar: React.FC<Props> = ({ toggleSidebar }) => {
  const authModal = useDisclose();

  return (
    <>
      <AppBar sx={{ height: TOPBAR_HEIGHT }} position="static" color='primary'>
        <Grid container>
          <Grid item>
            <IconButton
              sx={{ m: 0, p: 2 }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          </Grid>

          <Grid item display='flex' flexGrow={1} alignItems='center'>
            <Typography variant="h6">
              E-Commerce
            </Typography>
          </Grid>

          <Grid item display='flex' alignItems='center'>
            <Button color="inherit" onClick={authModal.onOpen}>Login</Button>
          </Grid>
        </Grid>
      </AppBar>

      <Auth open={authModal.isOpen} onClose={authModal.onClose} />
    </>
  );
}

export default TopBar;
import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useDisclose } from '../../../hooks/util';
import Auth from '../../../pages/Auth';
import { signOutRequest, userInfoRequest } from '../../../store/Auth/auth.slice';

type Props = {
  toggleSidebar: () => void;
}

export const TOPBAR_HEIGHT = 56;

const TopBar: React.FC<Props> = ({ toggleSidebar }) => {
  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector(state => state.auth);

  React.useEffect(() => {
    if (localStorage.getItem('accessToken'))
      dispatch(userInfoRequest());
  }, []);

  const menu = useDisclose();
  const signInModal = useDisclose();

  const iconButtonRef = React.useRef(null);

  const logout = () => {
    menu.onClose();
    dispatch(signOutRequest());
  }

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
            {!userInfo.username ?
              <Button color="inherit" onClick={signInModal.onOpen}>Login</Button>
              :
              <>
                <Tooltip title="Abrir Configurações">
                  <IconButton ref={iconButtonRef} onClick={menu.onOpen} sx={{ paddingBlock: 0 }}>
                    <Avatar>
                      {userInfo.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
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
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            }
          </Grid>
        </Grid>
      </AppBar>

      <Auth signInModal={signInModal} />
    </>
  );
}

export default TopBar;
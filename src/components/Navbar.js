import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from '@mui/system';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { createTheme } from '@mui/material';
import {useNavigate} from "react-router-dom"
import cookie from 'cookie';
import Map from './maps';

const cookies = cookie.parse(document.cookie);
console.log(cookies);

const Navbar = (props) => {

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate()
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  const handleLogout = () => {
    setOpen(false);
    document.cookie= "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    navigate("/login")
    window.location.reload()
  }

  const handleLogin = () => {
    navigate("/login")

  }

  const handleHome = (e) => {
    navigate("/")
    handleClose(e)
  }

  const handleAdd = (e) => {
    navigate("/addBusiness")
    handleClose(e)
  }




  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const theme = createTheme({
    typography: {
      fontFamily: ['Nunito', 'sans-serif'].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#292F36' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleHome}>Listings</MenuItem>
                        <MenuItem onClick={handleAdd}>Add a Business</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Typography
              variant="h2"
              component="div"
              align="left"
              sx={{ flexGrow: 1 , cursor:'pointer' }}
              onClick= {handleHome}
            >
              Everydaycritic
            </Typography>
            {cookies.token && <Button
            color="inherit"
            onClick={handleLogout}
            >
              Logout
            </Button>}
            {!cookies.token &&
            <Button
            color="inherit"
            onClick={handleLogin}
            >
              Login / Sign Up
            </Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;

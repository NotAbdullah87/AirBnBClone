import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AirBnbLogo from './airbnb_logo.png';
import '../index.css';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import SearchSection from './searchSection';

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, backgroundColor: 'white', color: 'black', boxShadow: "none" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' ,textAlign:"center"}}>
            <img src={AirBnbLogo} style={{ width: "10rem" }} alt="Airbnb Logo" />
          </Box>

          {/* Search Bar on Small Screens
          {isSmallScreen && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              sx={{ width: '60%' }}
            />
            
          )} */}

          {/* Middle Buttons Section for Larger Screens */}
          {!isSmallScreen && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" style={{fontFamily:"Montserrat"}}>Stays</Button>
              <Button color="inherit" style={{fontFamily:"Montserrat"}}>Experiences</Button>
            </Box>
          )}

          {/* Right Section with Globe and User for Larger Screens */}
          {!isSmallScreen && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>Airbnb your home</Typography>
              <IconButton color="inherit">
                <LanguageIcon />
              </IconButton>

              <IconButton style={{ border: "1px solid #cccccc", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.2rem", borderRadius: "2rem" }} color="inherit" onClick={handleMenuOpen}>
                <span>
                  <span style={{ marginRight: "0.2rem" }}> <MenuIcon style={{ fontSize: "1.5rem" }} /></span>
                  <AccountCircleIcon style={{ fontSize: "1.5rem" }} />
                </span>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Bottom Navigation for Small Screens */}
      {isSmallScreen && (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'white', color: 'black' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton color="inherit">
              <SearchIcon style={{color:"#FF5A5F"}} />
            </IconButton>
            <IconButton color="inherit">
              <FavoriteIcon style={{color:"#FF5A5F"}} />
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon style={{color:"#FF5A5F"}} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>

     
  
    </>
  );
};

export default Header;

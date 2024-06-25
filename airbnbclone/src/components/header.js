import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [phoneStep, setPhoneStep] = useState(true);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    name: '',
    password: '',
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignupOpen = () => {
    setSignupOpen(true);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
    setPhoneStep(true);
    setFormData({ phone: '', email: '', name: '', password: '' });
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setFormData({ phone: '', email: '', name: '', password: '' });
  };

  const handleContinue = () => {
    setPhoneStep(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        phone: formData.phone,
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });
      console.log('Signup Successful:', response.data);
      handleSignupClose(); // Close the dialog or perform other actions on success
      // Optionally, you can set state or handle success feedback here
    } catch (error) {
      console.error('Signup Error:', error);
      // Handle error cases (e.g., show error message to user)
    }
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: formData.email,
        password: formData.password,
      });
      console.log('Login Successful:', response.data);
      handleLoginClose(); // Close the dialog or perform other actions on success
      // Optionally, you can set state or handle success feedback here
    } catch (error) {
      console.error('Login Error:', error);
      // Handle error cases (e.g., show error message to user)
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, backgroundColor: 'white', color: 'black', boxShadow: "none" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: "center" }}>
            <img src={AirBnbLogo} style={{ width: "10rem" }} alt="Airbnb Logo" />
          </Box>

          {/* Middle Buttons Section for Larger Screens */}
          {!isSmallScreen && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" style={{ fontFamily: "Montserrat" }}>Stays</Button>
              <Button color="inherit" style={{ fontFamily: "Montserrat" }}>Experiences</Button>
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
              <SearchIcon style={{ color: "var(--red)" }} />
            </IconButton>
            <IconButton color="inherit">
              <FavoriteIcon style={{ color: "var(--red)" }} />
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon style={{ color: "var(--red)" }} />
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
        <MenuItem onClick={handleLoginOpen}>Login</MenuItem>
        <MenuItem onClick={handleSignupOpen}>Sign Up</MenuItem>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Signup Dialog */}
      <Dialog
        open={signupOpen}
        onClose={handleSignupClose}
        maxWidth="md"
        fullWidth
        sx={{ '& .MuiDialog-paper': { minHeight: '450px', width: "450px" } }}
      >
        <DialogTitle><Typography sx={{ fontFamily: "Montserrat", fontWeight: "700" }}>{phoneStep ? 'Sign Up' : 'Sign Up Details'}</Typography></DialogTitle>
        <hr></hr>
        <DialogContent>
          <Typography sx={{ fontFamily: "Montserrat", fontWeight: '700', fontSize: "1.5rem" }}>Welcome to AirBnb</Typography>
          <DialogContentText>
            <Typography sx={{ fontFamily: "Montserrat" }}>{phoneStep ? 'Enter your phone number to continue.' : 'Enter your details to complete the signup.'}</Typography>
          </DialogContentText>
          {phoneStep ? (
            <PhoneInput
              country={'us'}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
            />
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}

          <Typography sx={{ fontSize: "0.7rem", mt: "1rem", fontFamily: "Montserrat" }}>We’ll call or text you to confirm your number. Standard message and data rates apply. <span style={{ fontWeight: 700 }}>Privacy Policy</span></Typography>
          <Box width="100%" textAlign={'center'} sx={{ mt: "1rem" }}>
            <Button
              variant="contained"
              onClick={phoneStep ? handleContinue : handleSignupSubmit}
              sx={{
                backgroundColor: phoneStep ? "var(--red)" : undefined,
                color: phoneStep ? "white" : undefined,
                marginBottom: '8px', // Add space between buttons
                width: "100%"
              }}
            >
              {phoneStep ? 'Continue' : 'Sign Up'}
            </Button>
          </Box>

          <Typography textAlign={'center'}>or</Typography>
          <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} style={{ marginTop: '8px', color: "black", fontFamily: "Montserrat", border: "1px solid #cccccc" }}>
            Continue with Facebook
          </Button>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} style={{ marginTop: '8px', color: "black", fontFamily: "Montserrat", border: "1px solid #cccccc" }}>
            Continue with Google
          </Button>
          <Button fullWidth variant="outlined" startIcon={<AppleIcon />} style={{ marginTop: '8px', color: "black", fontFamily: "Montserrat", border: "1px solid #cccccc" }}>
            Continue with Apple
          </Button>
        </DialogContent>
      </Dialog>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={handleLoginClose} style={{ fontFamily: "Montserrat" }}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: "Montserrat", fontWeight: '700', fontSize: "1.5rem" }}>Welcome to AirBnb</Typography>
          <DialogContentText>
            Enter your email or phone number and password to login.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email Address or Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={formData.password}
            onChange={handleChange}
          />
          <Button onClick={handleLoginSubmit} sx={{
            backgroundColor: phoneStep ? "var(--red)" : undefined,
            color: phoneStep ? "white" : undefined,
            marginBottom: '8px', // Add space between buttons
            width: "100%",
            mt: "1rem"
          }}>Login</Button>
          <Typography textAlign={'center'}>or</Typography>
          <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} style={{ marginTop: '8px', color: "black", fontFamily: "Montserrat", border: "1px solid #cccccc" }}>
            Continue with Facebook
          </Button>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} style={{ marginTop: '8px', color: "black", fontFamily: "Montserrat", border: "1px solid #cccccc" }}>
            Continue with Google
          </Button>
          <Button fullWidth variant="outlined" startIcon={<AppleIcon />} style={{ marginTop: '8px', color: "black", fontFamily: "Montserrat", border: "1px solid #cccccc" }}>
            Continue with Apple
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;

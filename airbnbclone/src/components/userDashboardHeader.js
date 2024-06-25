import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
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
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from './searchSection';
import { Link } from 'react-router-dom';

const UserDashboardHeader = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Initialize useNavigate instead of useHistory

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

      // Save user email in localStorage
      localStorage.setItem('userEmail', formData.email);

      setSnackbarMessage('Signup successful.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleSignupClose(); // Close the dialog or perform other actions on success

      // Navigate to Dashboard
      navigate('/dashboard'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Signup Error:', error);
      setSnackbarMessage('Signup failed. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
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

      // Save user email in localStorage
      localStorage.setItem('userEmail', formData.email);

      setSnackbarMessage('Login successful.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleLoginClose(); // Close the dialog or perform other actions on success

      // Navigate to Dashboard
      navigate('/dashboard'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Login Error:', error);
      setSnackbarMessage('Login failed. Please check your credentials.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      // Handle error cases (e.g., show error message to user)
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
              <Link to={'/list/step1'} ><Button style={{textTransform:"none"}}><Typography sx={{ fontWeight: 600 ,fontFamily:"Montserrat",color:"black"}}>Airbnb your home</Typography></Button>
              </Link>
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
              <SearchIcon style={{ color: "black" }} />
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
        {/* <MenuItem onClick={handleLoginOpen}>Login</MenuItem>
        <MenuItem onClick={handleSignupOpen}>Sign Up</MenuItem> */}
        <MenuItem >Profile</MenuItem>
        <MenuItem >Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>

    </>
  );
};

export default UserDashboardHeader;

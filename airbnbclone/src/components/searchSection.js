import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

const searchBarStyle = {
  width: 650,
  background: 'white',
  boxShadow: '0 0 5px hsl(0 0% 78%)',
  height: 55,
  borderRadius: '100vw',
  margin: '6rem auto 0', // Center aligning using margin and auto for horizontal centering
  display: 'flex',
  justifyContent: 'center',
  fontSize: '0.6rem',
  position: 'relative',
  '@media (max-width: 600px)': {
    width: '100%',
    borderRadius: 0,
  },
};

const iconButtonStyle = {
  padding: 10,
};

const inputBaseStyle = {
  background: 'none',
  border: 'none',
  padding: '0.2rem 0 0 0',
  fontSize: '0.75rem',
  width: '100%',
  '&:focus': {
    outline: 'none',
  },
};


const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const handleSearch = () => {
    onSearch(location, priceFilter);
  };

  return (
    <Container maxWidth="md">
      <Paper sx={searchBarStyle} elevation={0}>
        {/* Location input */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', borderRight: '1px solid hsl(0 0% 90%)', position: 'relative' }}>
          <IconButton style={iconButtonStyle}>
            <LocationOnIcon />
          </IconButton>
          <InputBase
            placeholder="Where are you going?"
            style={inputBaseStyle}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Price filter input */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
          <InputBase
            placeholder="Filter by price"
            style={inputBaseStyle}
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
          <IconButton style={{ ...iconButtonStyle, background: '#FF385C', color: 'white' }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </Paper>
    </Container>
  );
};

export default SearchBar;

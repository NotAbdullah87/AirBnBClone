import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

const SearchBar = () => {
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

  const iconButtonStyle = {
    padding: 10,
  };

  return (
    <Container maxWidth="md"> {/* Using maxWidth to limit the width of Container */}
      <Paper sx={searchBarStyle} elevation={0}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Location */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', borderRight: '1px solid hsl(0 0% 90%)', position: 'relative' }}>
            <IconButton style={iconButtonStyle}>
              <LocationOnIcon />
            </IconButton>
            <InputBase
              placeholder="Where are you going?"
              style={inputBaseStyle}
            />
          </div>

          {/* Check-in */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', borderRight: '1px solid hsl(0 0% 90%)', position: 'relative' }}>
            <IconButton style={iconButtonStyle}>
              <EventIcon />
            </IconButton>
            <InputBase
              placeholder="Add dates"
              style={inputBaseStyle}
            />
          </div>

          {/* Check-out */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', borderRight: '1px solid hsl(0 0% 90%)', position: 'relative' }}>
            <IconButton style={iconButtonStyle}>
              <EventIcon />
            </IconButton>
            <InputBase
              placeholder="Add dates"
              style={inputBaseStyle}
            />
          </div>

          {/* Guests */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
        
            <InputBase
              placeholder="Add guests"
              style={inputBaseStyle}
            />
            <IconButton style={{ ...iconButtonStyle, background: '#FF385C', color: 'white' }}>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default SearchBar;
